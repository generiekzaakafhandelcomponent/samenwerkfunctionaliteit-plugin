import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  DOCUMENTEN_URL,
  SAMENWERKINGEN_URL,
} from '../config/swf-plugin-config';
import { DocumentenOverzichtResponse } from '../dto/document.dto';
import { FileDownload } from '../interface/file-download.interface';
import { UUID } from '../types/uuid.type';
import { FileResponseUtil } from '../utils/file-response.util';

@Injectable({
  providedIn: 'root',
})
export class DocumentClient {
  private readonly http: HttpClient = inject(HttpClient);

  getDocumenten(
    samenwerkingId: string,
  ): Observable<DocumentenOverzichtResponse> {
    return this.http.get<DocumentenOverzichtResponse>(
      `${SAMENWERKINGEN_URL}/${samenwerkingId}/documenten`,
    );
  }

  downloadDocument(documentId: UUID): Observable<FileDownload> {
    return this.http
      .get(`${DOCUMENTEN_URL}/${documentId}/content`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response: HttpResponse<Blob>): FileDownload => {
          return FileResponseUtil.toFileDownload(response);
        }),
      );
  }
}
