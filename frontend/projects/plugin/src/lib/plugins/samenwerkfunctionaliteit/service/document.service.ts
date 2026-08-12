import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  DocumentenApiLinkProcessService,
  UploadProcessLink,
} from '@valtimo/zgw';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';

import {
  DocumentenApiFileReference,
  UploadProviderService,
} from '@valtimo/resource';
import { NGXLogger } from 'ngx-logger';
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
import { ConfidentialityTypes } from '../types/confidentiality.type';
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
  private readonly documentenApiLinkProcessService: DocumentenApiLinkProcessService =
    inject(DocumentenApiLinkProcessService);
  private readonly uploadProviderService: UploadProviderService = inject(
    UploadProviderService,
  );

  private readonly logger: NGXLogger = inject(NGXLogger);

  PLUGIN_DOCUMENTEN_API_PLUGIN_MANAGEMENT_KEY = 'documentenapi';

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

  uploadDocumentToDocumentenAPI(
    context: UploadContext,
    metadata: UploadDocumentMetadata,
  ): Observable<DocumentenApiFileReference> {
    console.log('Uploading to Documenten API');
    console.log('context:', context, 'metadata', metadata);

    return this.getLinkedUploadProcess(context).pipe(
      tap((processLink) => {
        this.logger.debug('Found Documenten API process link: ', processLink);
      }),
      switchMap(() => {
        return this.uploadProviderService.uploadTempFileWithMetadata(
          context.file,
          {
            documentId: context.businessKey,
            bestandsnaam: context.file.name,
            titel: context.file.name,
            auteur: 'Samenwerkfunctionaliteit-plugin',
            taal: 'nld',
            vertrouwelijkheidaanduiding:
              // Note: mapping confidentiality types between Dutch and English is not straightforward, so we use a simple mapping here.
              metadata.confidentialityType === ConfidentialityTypes.Confidential
                ? 'vertrouwelijk'
                : 'confidentieel',
            creatieDatum: new Date().toISOString().split('T')[0],
          },
        );
      }),
      tap((reference) => {
        this.logger.debug(
          `Successfully uploaded file to Documenten API — reference ID: ${reference.id}`,
        );
      }),
      tap(() => {
        const notification: UserNotification = {
          titleKey:
            'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenApiSuccessTitle',
          messageKey:
            'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenApiSuccessMessage',
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
            'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenAPIFailureTitle',
        });

        return throwError(() => error);
      }),
    );
  }

  uploadDocumentToSWF(
    context: UploadContext,
    metadata?: UploadDocumentMetadata,
  ): Observable<void> {
    console.log('Uploading to Samenwerkfunctionaliteit-API');

    return this.documentClient
      .uploadDocument(context.file, context.samenwerkingId, metadata)
      .pipe(
        tap(() =>
          this.logger.info(
            `Successfully uploaded ${context.file.name} to Samenwerkfunctionaliteit API`,
          ),
        ),
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

  private getLinkedUploadProcess(
    context: UploadContext,
  ): Observable<UploadProcessLink> {
    return this.documentenApiLinkProcessService
      .getLinkedUploadProcess(
        context.caseDefinitionKey,
        context.caseDefinitionVersionTag,
      )
      .pipe(
        tap((processLink) => {
          if (!processLink) {
            throw new Error(
              `No linked Documenten API process found for caseDefinitionKey: ${context.caseDefinitionKey}, caseDefinitionVersionTag: ${context.caseDefinitionVersionTag}`,
            );
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.showError({
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenAPIFailureTitle',
          });
          return throwError(() => error);
        }),
      );
  }
}
