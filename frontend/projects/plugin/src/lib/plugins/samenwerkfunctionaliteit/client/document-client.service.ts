import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DocumentenOverzichtResponse } from '../dto/document.dto';
import { UUID } from '../types/uuid.type';
import { FileResponseUtil } from '../utils/file-response.util';
import { FileDownload } from '../interface/file-download.interface';
import {
  SAMENWERKINGEN_URL,
  DOCUMENTEN_URL,
} from '../config/swf-plugin-config';

@Injectable({
  providedIn: 'root',
})
export class DocumentClient {
  private readonly http: HttpClient = inject(HttpClient);

  getDocumenten(
    samenwerkingId: string,
  ): Observable<DocumentenOverzichtResponse> {
    return this.http.get<DocumentenOverzichtResponse>(
      `${SAMENWERKINGEN_URL}}/${samenwerkingId}/documenten`,
    );
  }

  downloadDocument(documentId: UUID): Observable<FileDownload> {
    return this.http
      .get(`${DOCUMENTEN_URL}/${documentId}/content`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          return FileResponseUtil.toFileDownload(response);
        }),
      );
  }
}
