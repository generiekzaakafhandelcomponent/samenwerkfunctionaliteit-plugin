import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Bericht, ChatBericht } from '../../../models/bericht.model';
import { BerichtComponent } from './bericht/bericht.component';
import { BerichtenService } from '../../../service/berichten.service';
import { SwfDocumentService } from '../../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessKey } from '../../../models/business-key.model';
import { finalize, switchMap, take, tap } from 'rxjs';
import { SamenwerkingProperties } from '../../../models/samenwerking-properties.model';
import { mapBerichtenToChatBerichten } from '../../../mapper/bericht.mapper';

@Component({
  selector: 'berichten-list',
  imports: [BerichtComponent],
  templateUrl: './berichten-list.component.html',
  styleUrl: './berichten-list.component.scss',
})
export class BerichtenListComponent implements OnInit {
  private readonly berichtenService: BerichtenService =
    inject(BerichtenService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  messages: WritableSignal<ChatBericht[]> = signal<ChatBericht[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');
  sortedMessages: Signal<ChatBericht[]> = computed(() => {
    return [...this.messages()].sort(
      (a, b) => a.createdOn.getTime() - b.createdOn.getTime(),
    );
  });

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    this.fetchChatBerichten(documentId);
  }

  private fetchChatBerichten(documentId: string) {
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
