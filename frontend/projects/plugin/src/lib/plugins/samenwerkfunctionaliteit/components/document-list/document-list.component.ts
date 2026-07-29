import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationModule } from 'carbon-components-angular';
import { finalize, Observable, switchMap, take, tap } from 'rxjs';
import { DocumentInterface } from '../../interface/document.interface';
import { Document } from '../../models/document.model';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { DocumentService } from '../../service/document.service';
import { FileDownloadService } from '../../service/file-download.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { UserNotificationService } from '../../service/user-notification.service';
import { toBusinessKey } from '../../types/business-key.type';
import { toUUID } from '../../types/uuid.type';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentTableLightComponent } from './document-table/light/document-table-light.component';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  imports: [
    DocumentTableComponent,
    NotificationModule,
    DocumentTableLightComponent,
  ],
  styleUrl: './document-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly notificationService: UserNotificationService = inject(
    UserNotificationService,
  );
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly downloader: FileDownloadService =
    inject(FileDownloadService);

  isLightMode: InputSignal<boolean> = input<boolean>(false);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    const documentId: string = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    this.fetchDocumenten(documentId);
  }

  protected downloadDocument(id: string): void {
    const fileDownloadSubscription = this.documentService
      .downloadDocument(toUUID(id))
      .pipe(
        take(1),
        tap((file) => this.downloader.download(file)),
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError({
            actionDescriptionKey:
              'samenwerkfunctionaliteit.userFeedback.message.failedToDownload',
          });
          throw error;
        },
      });

    this.destroyRef.onDestroy(() => {
      fileDownloadSubscription.unsubscribe();
    });
  }

  private fetchDocumenten(documentId: string): void {
    const businessKey = toBusinessKey(documentId);

    this.swfDocumentService
      .getSamenwerkingProperties(businessKey)
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
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError({
            actionDescriptionKey:
              'samenwerkfunctionaliteit.userFeedback.message.failedToFetchDocuments',
          });
          throw error;
        },
      });
  }
}
