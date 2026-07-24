import { Component, inject, signal, WritableSignal } from '@angular/core';
import { StuurBerichtComponent } from '../../components/berichten/stuur-bericht/stuur-bericht.component';
import { BerichtenListComponent } from '../../components/berichten/berichten-list/berichten-list.component';
import { combineLatest, finalize, forkJoin, Observable, take, tap } from 'rxjs';
import { Bericht, ChatBericht } from '../../models/bericht.model';
import { BerichtenService } from '../../service/berichten.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessKey } from '../../models/business-key.model';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { mapBerichtenToChatBerichten } from '../../mapper/bericht.mapper';
import { SamenwerkingService } from '../../service/samenwerking.service';
import { SwfPluginService } from '../../service/swf-plugin.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'berichten-custom-tab',
  imports: [StuurBerichtComponent, BerichtenListComponent],
  templateUrl: './berichten-custom-tab.component.html',
  styleUrl: './berichten-custom-tab.component.css',
})
export class BerichtenCustomTabComponent {
  private readonly berichtenService: BerichtenService =
    inject(BerichtenService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly samenwerkingService: SamenwerkingService =
    inject(SamenwerkingService);
  private readonly swfPluginService: SwfPluginService =
    inject(SwfPluginService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  messages: WritableSignal<ChatBericht[]> = signal<ChatBericht[]>([]);
  oinNumber: WritableSignal<string> = signal<string>('');
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  messageReceiver: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    this.refreshMessages();
  }

  protected refreshMessages(): void {
    this.isLoading.set(true);
    const valtimoBusinessKey: BusinessKey = {
      value: this.getDocumentId(),
    };
    this.combineAllRequestsAndSetIsLoading(valtimoBusinessKey);
  }

  private capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  private getDocumentId(): string {
    return this.swfDocumentService.getParam(this.route, 'documentId');
  }

  private combineAllRequestsAndSetIsLoading(valtimoBusinessKey: BusinessKey) {
    this.swfDocumentService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        tap((samenwerkingProperties: SamenwerkingProperties) => {
          if (!samenwerkingProperties.actieverzoekId) {
            throw Error('Dossier heeft geen actieverzoekId');
          }
        }),
        switchMap(
          (
            samenwerkingProperties: SamenwerkingProperties,
          ): Observable<[string, ChatBericht[]]> => {
            return combineLatest<[string, ChatBericht[]]>([
              this.fetchReceiverFromActieverzoek(
                samenwerkingProperties,
                valtimoBusinessKey,
              ),
              this.fetchChatBerichten(samenwerkingProperties),
            ]);
          },
        ),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.hasError.set(false);
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }

  private fetchReceiverFromActieverzoek(
    samenwerkingProperties: SamenwerkingProperties,
    valtimoBusinessKey: BusinessKey,
  ): Observable<string> {
    return forkJoin({
      swfPluginProperties: this.swfPluginService.getSwfPluginProperties(),
      actieverzoek: this.samenwerkingService.getActieverzoek(
        samenwerkingProperties.actieverzoekId,
        valtimoBusinessKey,
      ),
    }).pipe(
      map(({ swfPluginProperties, actieverzoek }) => {
        this.oinNumber.set(swfPluginProperties.oinNummer);
        return this.capitalize(
          swfPluginProperties.oinNummer !== actieverzoek.sender
            ? actieverzoek.senderName
            : actieverzoek.receiverName,
        );
      }),
      tap((receiver) => {
        this.messageReceiver.set(receiver);
      }),
    );
  }

  private fetchChatBerichten(
    samenwerkingProperties: SamenwerkingProperties,
  ): Observable<ChatBericht[]> {
    return this.berichtenService
      .getBerichten(samenwerkingProperties.actieverzoekId)
      .pipe(
        take(1),
        map((messages: Bericht[]) => {
          return mapBerichtenToChatBerichten(messages);
        }),
        tap((chatMessages: ChatBericht[]) => {
          this.messages.set(chatMessages);
        }),
      );
  }
}
