import { inject, Injectable } from '@angular/core';
import { DocumentClient } from '../client/document-client.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DocumentInterface } from '../interface/document.interface';
import { UUID } from '../types/uuid.type';
import {
  DocumentenOverzichtResponse,
  mapDocumentenResponseToModels,
} from '../dto/document.dto';
import { FileDownload } from '../interface/file-download.interface';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly documentClient: DocumentClient = inject(DocumentClient);

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

  downloadDocument(documentId: UUID): Observable<FileDownload> {
    return this.documentClient.downloadDocument(documentId);
  }
}
