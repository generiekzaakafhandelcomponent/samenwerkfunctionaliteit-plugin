import { inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of, switchMap, tap } from 'rxjs';
import { UploadContext } from '../interface/upload-context.interface';
import { UploadDocumentMetadata } from '../interface/upload-document-metadata.interface';
import { ConfidentialityTypes } from '../types/confidentiality.type';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root',
})
export class UploadWorkFlowService {
  private readonly documentService = inject(DocumentService);
  private readonly logger: NGXLogger = inject(NGXLogger);

  // Making this configurable in the future, via SWF Plugin Service.
  private readonly shouldUploadToDocumentenAPI: boolean = false;

  startUpload(context: UploadContext): Observable<void> {
    // return some mock data to test; replace with call to modal service to collect data from user.
    return of<UploadDocumentMetadata>(this.mockModalData).pipe(
      tap((metadata) => {
        console.log('Uploading with mock metadata:', metadata);
      }),
      switchMap((metadata) =>
        this.documentService.uploadDocumentToSWF(context, metadata),
      ),
      tap(() =>
        this.logger.info(
          `Successfully uploaded ${context.file.name} to Samenwerkfunctionaliteit-API`,
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
