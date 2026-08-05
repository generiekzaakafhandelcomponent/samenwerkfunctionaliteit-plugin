import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { DocumentClient } from '../client/document-client.service';
import {
  DocumentenOverzichtResponse,
  mapDocumentenResponseToModels,
} from '../dto/document.dto';
import { DocumentInterface } from '../interface/document.interface';
import { FileDownload } from '../interface/file-download.interface';
import { UploadContext } from '../interface/upload-context.interface';
import { UploadDocumentMetadata } from '../interface/upload-document-metadata.interface';
import { UserNotification } from '../interface/user-notification.interface';
import { UUID } from '../types/uuid.type';
import { FileDownloadService } from './file-download.service';
import { UserNotificationService } from './user-notification.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly documentClient: DocumentClient = inject(DocumentClient);
  private readonly downloader: FileDownloadService =
    inject(FileDownloadService);
  private readonly notificationService: UserNotificationService = inject(
    UserNotificationService,
  );

  getDocumenten(samenwerkingId: string): Observable<DocumentInterface[]> {
    return this.documentClient.getDocumenten(samenwerkingId).pipe(
      map((documentenOverzichtResponse: DocumentenOverzichtResponse) => {
        return mapDocumentenResponseToModels(documentenOverzichtResponse);
      }),
      map((documenten: DocumentInterface[]) => {
        return documenten.filter((document) => {
          return document.samenwerkingId === samenwerkingId;
        });
      }),
      catchError((error: Error) => {
        return throwError(() => error);
      }),
    );
  }

  uploadDocumentToSWF(
    context: UploadContext,
    metadata?: UploadDocumentMetadata,
  ): Observable<void> {
    console.log('Uploading to SWF');

    return this.documentClient
      .uploadDocument(context.file, context.samenwerkingId, metadata)
      .pipe(
        tap(() => {
          const notification: UserNotification = {
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWFSuccessTitle',
            messageKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWFSuccessMessage',
            messageParam: { filename: context.file.name },
          };

          if (context.file.name) {
            notification.messageParam = { filename: context.file.name };
          }

          this.notificationService.showSuccess(notification);
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError({
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWFFailureTitle',
          });

          return throwError(() => error);
        }),
      );
  }

  downloadDocument(documentId: UUID): Observable<FileDownload> {
    return this.documentClient.downloadDocument(documentId).pipe(
      tap((file) => this.downloader.download(file)),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError({
          titleKey:
            'samenwerkfunctionaliteit.feedback.userNotification.downloadDocumentFailureTitle',
        });
        return throwError(() => error);
      }),
    );
  }
}
