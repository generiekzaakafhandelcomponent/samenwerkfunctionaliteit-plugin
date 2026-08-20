import { inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { NoLinkedUploadProcessError } from '../errors/no-link-upload-process.error';
import { UploadContext } from '../interface/upload-context.interface';
import { UploadDocumentMetadata } from '../interface/upload-document-metadata.interface';
import { UserNotification } from '../interface/user-notification.interface';
import { ConfidentialityTypes } from '../types/confidentiality.type';
import { DocumentService } from './document.service';
import { SwfPluginService } from './swf-plugin.service';
import { UserNotificationService } from './user-notification.service';

@Injectable({
  providedIn: 'root',
})
export class UploadWorkFlowService {
  private readonly documentService = inject(DocumentService);
  private readonly swfPluginService: SwfPluginService =
    inject(SwfPluginService);
  private readonly notificationService: UserNotificationService = inject(
    UserNotificationService,
  );
  private readonly logger: NGXLogger = inject(NGXLogger);

  startUpload(context: UploadContext): Observable<void> {
    // TODO: replace with call to modal service to collect data from user. For now: return some mock data to test;
    return forkJoin({
      metadata: of<UploadDocumentMetadata>(this.mockModalData),
      config: this.swfPluginService.getSwfPluginProperties(),
    }).pipe(
      tap(({ metadata, config }) => {
        if (!config.backupUploadsToDocumentenApi) {
          this.logger.debug(
            'Skipping backup upload to Documenten API as per configuration',
          );
          return of(metadata);
        }
        this.logger.debug('Uploading with mock metadata:', metadata);
      }),

      switchMap(({ metadata }) => {
        return this.documentService
          .uploadDocumentToDocumentenAPI(context, metadata)
          .pipe(
            tap(() => {
              const notification: UserNotification = {
                titleKey:
                  'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenApi.success.title',
                messageKey:
                  'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenApi.success.message',
                messageParam: { filename: context.file.name },
              };

              this.notificationService.showSuccess(notification);
            }),

            map((reference) => ({
              ...metadata,
              systemId: reference.id,
            })),

            catchError((error: Error) => {
              if (error instanceof NoLinkedUploadProcessError) {
                this.notificationService.showError({
                  titleKey:
                    'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWF.failure.title',
                });
              } else {
                this.notificationService.showError({
                  titleKey:
                    'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToDocumentenApi.failure.title',
                });
              }
              return of(metadata);
            }),
          );
      }),

      switchMap((metadata) =>
        this.documentService.uploadDocumentToSWF(context, metadata).pipe(
          tap(() => {
            const notification: UserNotification = {
              titleKey:
                'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWF.success.title',
              messageKey:
                'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWF.success.message',
              messageParam: { filename: context.file.name },
            };

            this.notificationService.showSuccess(notification);
          }),

          catchError(() => {
            this.notificationService.showError({
              titleKey:
                'samenwerkfunctionaliteit.feedback.userNotification.uploadDocumentToSWF.failure.title',
            });
            return of(undefined);
          }),
        ),
      ),
    );
  }

  mockModalData = {
    documentDescription: 'Test document',
    numberWithinSystem: '12345',
    systemId: 'ACME_EU_WEST',
    confidentialityType: ConfidentialityTypes.StrictlyConfidential,
    language: 'Nederlands',
  };
}
