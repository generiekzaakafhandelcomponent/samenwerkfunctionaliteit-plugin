import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentService } from '../../service/document.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';
import { BusinessKey } from '../../models/business-key.model';
import {
  finalize,
  Observable,
  switchMap,
  take,
  tap,
  takeUntil,
  Subject,
} from 'rxjs';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { NotificationModule } from 'carbon-components-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { DocumentInterface } from '../../interface/document.interface';
import { DocumentTableLightComponent } from './document-table/light/document-table-light.component';
import { toUUID } from '../../types/uuid.type';
import { FileDownloadService } from '../../service/file-download.service';
import { OnDestroyService } from '../../service/on-destroy.service';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  imports: [
    DocumentTableComponent,
    NotificationModule,
    TranslatePipe,
    DocumentTableLightComponent,
  ],
  standalone: true,
  styleUrl: './document-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly destroy$: OnDestroyService = inject(OnDestroyService);

  readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly downloader: FileDownloadService =
    inject(FileDownloadService);

  isLightMode: InputSignal<boolean> = input<boolean>(false);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    const documentId: string = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    this.fetchDocumenten(documentId);
  }

  downloadDocument(id: string) {
    this.documentService
      .downloadDocument(toUUID(id))
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((file) => {
        this.downloader.download(file);
      });
  }

  private fetchDocumenten(documentId: string): void {
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
              'Er is geen documentenlijst beschikbaar, omdat dit dossier niet deel uitmaakt van een samenwerking.',
            );
          }
        }),
        switchMap(
          (
            samenwerkingProperties: SamenwerkingProperties,
          ): Observable<DocumentInterface[]> => {
            return this.documentService
              .getDocumenten(samenwerkingProperties.samenwerkingId)
              .pipe(
                take(1),
                tap((documenten: DocumentInterface[]): void => {
                  this.documents.set(documenten);
                }),
              );
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
}
