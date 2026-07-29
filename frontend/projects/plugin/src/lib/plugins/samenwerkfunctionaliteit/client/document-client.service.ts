import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  DOCUMENTEN_URL,
  SAMENWERKINGEN_URL,
} from '../config/swf-plugin-config';
import {
  DocumentenOverzichtResponse,
  mapConfidentialityTypeToVertrouwelijkheidsaanduiding,
} from '../dto/document.dto';
import { FileDownload } from '../interface/file-download.interface';
import { UploadDocumentQueryParams } from '../interface/upload-document-query-params.interface';
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

  uploadDocument(
    file: File,
    samenwerkingId: string,
    queryParams?: UploadDocumentQueryParams,
  ): Observable<void> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    let params = new HttpParams();

    if (queryParams?.documentDescription != null) {
      params.set('documentOmschrijving', queryParams.documentDescription);
    }
    if (queryParams?.numberWithinSystem != null) {
      params.set('nummerBinnenSysteem', queryParams.numberWithinSystem);
    }
    if (queryParams?.systemId != null) {
      params.set('kenmerkSysteem', queryParams.systemId);
    }
    if (queryParams?.confidentialityType != null) {
      params.set(
        'vertrouwelijkheidsAanduiding',
        mapConfidentialityTypeToVertrouwelijkheidsaanduiding(
          queryParams.confidentialityType,
        ),
      );
    }
    if (queryParams?.taal != null) {
      params.set('taal', queryParams.taal);
    }

    return this.http.post<void>(
      `${SAMENWERKINGEN_URL}/${samenwerkingId}/documenten`,
      formData,
      { params },
    );
  }
}
