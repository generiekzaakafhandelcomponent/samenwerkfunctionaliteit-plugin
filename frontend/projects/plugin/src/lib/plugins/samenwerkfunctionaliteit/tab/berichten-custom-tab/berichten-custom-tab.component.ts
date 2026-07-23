import { Component, inject, signal, WritableSignal } from '@angular/core';
import { StuurBerichtComponent } from '../../components/berichten/stuur-bericht/stuur-bericht.component';
import { BerichtenListComponent } from '../../components/berichten/berichten-list/berichten-list.component';
import { finalize, forkJoin, switchMap, take, tap } from 'rxjs';
import { Bericht, ChatBericht } from '../../models/bericht.model';
import { BerichtenService } from '../../service/berichten.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessKey } from '../../models/business-key.model';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { mapBerichtenToChatBerichten } from '../../mapper/bericht.mapper';
import { SamenwerkingService } from '../../service/samenwerking.service';
import { SwfPluginService } from '../../service/swf-plugin.service';
import { map } from 'rxjs/operators';

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

  messages: WritableSignal<ChatBericht[]> = signal([]);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  messageReceiver: WritableSignal<string> = signal<string>('');

  actieverzoekId: string = '';

  ngOnInit() {
    this.fetchChatBerichten(this.getDocumentId());
  }

  protected refreshMessages(): void {
    this.isLoading.set(true);
    this.fetchChatBerichten(this.getDocumentId());
  }

  private capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  private getDocumentId(): string {
    return this.swfDocumentService.getParam(this.route, 'documentId');
  }

  private fetchReceiverFromActieverzoek(actieverzoekId: string) {
    forkJoin({
      swfPluginProperties: this.swfPluginService.getSwfPluginProperties(),
      actieverzoek: this.samenwerkingService.getActieverzoek(actieverzoekId),
    })
      .pipe(
        map(({ swfPluginProperties, actieverzoek }) =>
          this.capitalize(
            swfPluginProperties.oinNummer !== actieverzoek.sender
              ? actieverzoek.senderName
              : actieverzoek.receiverName,
          ),
        ),
      )
      .subscribe((receiver: string) => this.messageReceiver.set(receiver));
  }

  private fetchChatBerichten(documentId: string): void {
    const valtimoBusinessKey: BusinessKey = {
      value: documentId,
    };

    this.swfDocumentService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        tap((samenwerkingProperties: SamenwerkingProperties): void => {
          if (!samenwerkingProperties.samenwerkingId) {
            throw new Error(
              'Er is geen berichtenlijst beschikbaar, omdat dit dossier niet deel uitmaakt van een samenwerking.',
            );
          }
          this.fetchReceiverFromActieverzoek(
            samenwerkingProperties.actieverzoekId,
          );
        }),
        switchMap((samenwerkingProperties: SamenwerkingProperties) => {
          return this.berichtenService
            .getBerichten(samenwerkingProperties.actieverzoekId)
            .pipe(
              take(1),
              tap((messages: Bericht[]) => {
                const chatBerichten: ChatBericht[] =
                  mapBerichtenToChatBerichten(messages);
                this.messages.set(chatBerichten);
              }),
            );
        }),
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
}
