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
import { UploadDocumentQueryParams } from '../interface/upload-document-query-params.interface';
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

  uploadDocument(
    file: File,
    samenwerkingId: string,
    queryParams?: UploadDocumentQueryParams,
  ): Observable<void> {
    return this.documentClient
      .uploadDocument(file, samenwerkingId, queryParams)
      .pipe(
        tap(() => {
          const notification: UserNotification = {
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentSuccessTitle',
            messageKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentSuccessMessage',
            messageParam: { filename: file.name },
          };

          if (file.name) {
            notification.messageParam = { filename: file.name };
          }

          this.notificationService.showSuccess(notification);
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError({
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentFailureTitle',
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
