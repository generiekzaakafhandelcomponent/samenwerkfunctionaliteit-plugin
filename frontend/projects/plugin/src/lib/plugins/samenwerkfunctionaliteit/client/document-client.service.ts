import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentenOverzichtResponse } from '../dto/document.dto';
import { UUID } from '../types/uuid.type';

@Injectable({
  providedIn: 'root',
})
export class DocumentClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly DOCUMENTEN_URL = 'documenten';

  getDocumenten(
    samenwerkingId: string,
  ): Observable<DocumentenOverzichtResponse> {
    return this.http.get<DocumentenOverzichtResponse>(
      `samenwerkfunctionaliteit/v5/samenwerkingen/${samenwerkingId}/${this.DOCUMENTEN_URL}`,
    );
  }

  downloadDocument(documentId: UUID): Observable<HttpResponse<Blob>> {
    return this.http.get(
      `samenwerkfunctionaliteit/v5/documenten/${documentId}/content`,
      {
        observe: 'response',
        responseType: 'blob',
      },
    );
  }
}
