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
import { UploadContext } from '../interface/upload-context.interface';
import { UploadDocumentMetadata } from '../interface/upload-document-metadata.interface';
import { ConfidentialityTypes } from '../types/confidentiality.type';
import { DocumentService } from './document.service';
import { SwfPluginService } from './swf-plugin.service';

@Injectable({
  providedIn: 'root',
})
export class UploadWorkFlowService {
  private readonly documentService = inject(DocumentService);
  private readonly swfPluginService: SwfPluginService =
    inject(SwfPluginService);
  private readonly logger: NGXLogger = inject(NGXLogger);

  startUpload(context: UploadContext): Observable<void> {
    // return some mock data to test; replace with call to modal service to collect data from user.
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
        console.log('Uploading with mock metadata:', metadata);
      }),

      switchMap(({ metadata }) => {
        return this.documentService
          .uploadDocumentToDocumentenAPI(context, metadata)
          .pipe(
            map((reference) => ({
              ...metadata,
              systemId: reference.id,
            })),
            catchError(() => {
              return of(metadata);
            }),
          );
      }),

      switchMap((metadata) =>
        this.documentService.uploadDocumentToSWF(context, metadata),
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
