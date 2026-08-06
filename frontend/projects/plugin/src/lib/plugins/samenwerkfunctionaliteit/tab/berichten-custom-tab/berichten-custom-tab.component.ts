import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { StuurBerichtComponent } from '../../components/berichten/stuur-bericht/stuur-bericht.component';
import { BerichtenListComponent } from '../../components/berichten/berichten-list/berichten-list.component';
import {
  combineLatest,
  finalize,
  forkJoin,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Bericht, ChatBericht } from '../../models/bericht.model';
import { BerichtenService } from '../../service/berichten.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { mapBerichtenToChatBerichten } from '../../mapper/bericht.mapper';
import { SwfPluginService } from '../../service/swf-plugin.service';
import { map } from 'rxjs/operators';
import { ActieverzoekService } from '../../service/actieverzoek.service';
import { BusinessKey, toBusinessKey } from '../../types/business-key.type';
import { IconModule, IconService } from 'carbon-components-angular';
import { Collaborate32 } from '@carbon/icons';
import { capitalize } from '../../utils/capitalize';

@Component({
  selector: 'berichten-custom-tab',
  imports: [StuurBerichtComponent, BerichtenListComponent, IconModule],
  templateUrl: './berichten-custom-tab.component.html',
  styleUrl: './berichten-custom-tab.component.css',
})
export class BerichtenCustomTabComponent implements OnInit {
  private readonly berichtenService: BerichtenService =
    inject(BerichtenService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly actieverzoekService: ActieverzoekService =
    inject(ActieverzoekService);
  private readonly swfPluginService: SwfPluginService =
    inject(SwfPluginService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly iconService: IconService = inject(IconService);

  messages: WritableSignal<ChatBericht[]> = signal<ChatBericht[]>([]);
  oinNumber: WritableSignal<string> = signal<string>('');
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  otherParticipant: WritableSignal<string> = signal<string>('');

  samenwerkingProperties: SamenwerkingProperties;

  ngOnInit(): void {
    this.loadMessages();
    this.iconService.registerAll([Collaborate32]);
  }

  protected refreshMessages(): void {
    this.isLoading.set(true);
    this.fetchChatBerichten(this.samenwerkingProperties)
      .pipe(
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

  private loadMessages(): void {
    this.combineAllRequestsAndSetIsLoading(this.getBusinessKey());
  }

  private getBusinessKey(): BusinessKey {
    const businessKeyAsString = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );

    return toBusinessKey(businessKeyAsString);
  }

  private fetchSamenwerkingProperties(): Observable<SamenwerkingProperties> {
    return this.swfDocumentService
      .getSamenwerkingProperties(this.getBusinessKey())
      .pipe(
        take(1),
        tap((samenwerkingProperties: SamenwerkingProperties) => {
          if (!samenwerkingProperties.actieverzoekDetails.actieverzoekId) {
            throw Error('Dossier heeft geen actieverzoekId');
          }
          this.samenwerkingProperties = samenwerkingProperties;
        }),
      );
  }

  private combineAllRequestsAndSetIsLoading(businessKey: BusinessKey): void {
    this.fetchSamenwerkingProperties()
      .pipe(
        switchMap((samenwerkingProperties: SamenwerkingProperties) => {
          return combineLatest<[string, ChatBericht[]]>([
            this.fetchOtherParticipantFromActieverzoek(
              samenwerkingProperties,
              businessKey,
            ),
            this.fetchChatBerichten(samenwerkingProperties),
          ]);
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

  private fetchOtherParticipantFromActieverzoek(
    samenwerkingProperties: SamenwerkingProperties,
    businessKey: BusinessKey,
  ): Observable<string> {
    return forkJoin({
      swfPluginProperties: this.swfPluginService.getSwfPluginProperties(),
      actieverzoek: this.actieverzoekService.getActieverzoek(
        samenwerkingProperties.actieverzoekDetails.actieverzoekId,
        businessKey,
      ),
    }).pipe(
      tap(({ swfPluginProperties }) => {
        this.oinNumber.set(swfPluginProperties.oinNummer);
      }),
      map(({ swfPluginProperties, actieverzoek }) => {
        return capitalize(
          swfPluginProperties.oinNummer !== actieverzoek.sender
            ? actieverzoek.senderName
            : actieverzoek.receiverName,
        );
      }),
      tap((receiver: string) => {
        this.otherParticipant.set(receiver);
      }),
    );
  }

  private fetchChatBerichten(
    samenwerkingProperties: SamenwerkingProperties,
  ): Observable<ChatBericht[]> {
    return this.berichtenService
      .getBerichten(samenwerkingProperties.actieverzoekDetails.actieverzoekId)
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
