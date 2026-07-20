import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';
import { OpenZaakInfo } from '../interface/open-zaak-info.interface';
import { DocumentService as ValtimoDocumentService } from '@valtimo/document';
import { OpenZaakService } from '@valtimo/resource';

@Injectable({
  providedIn: 'root',
})
export class OpenZaakUrlService {
  private static readonly OPEN_ZAAK_ID_PATH = 'content.openzaak.identificatie';

  constructor(
    private readonly valtimoDocumentService: ValtimoDocumentService,
    private readonly openZaakService: OpenZaakService,
  ) {}

  getOpenZaakInfo(documentId: string): Observable<OpenZaakInfo | null> {
    return forkJoin({
      document: this.valtimoDocumentService.getDocument(documentId),
      zaakTypes: this.openZaakService.getZaakTypes(),
    }).pipe(
      map(({ document, zaakTypes }) => {
        const openZaakId = _.get(
          document,
          OpenZaakUrlService.OPEN_ZAAK_ID_PATH,
        );

        if (!openZaakId) {
          console.warn(
            `OpenZaak ID is not available in the document (searching at '${OpenZaakUrlService.OPEN_ZAAK_ID_PATH}').`,
          );
          return null;
        }

        const zaakTypeUrl = zaakTypes[0]?.url;

        if (!zaakTypeUrl) {
          console.warn(
            'No zaak types found to retrieve the OpenZaak URL from.',
          );
          return null;
        }

        const baseUrl = new URL(zaakTypeUrl).origin;

        return {
          id: openZaakId,
          baseUrl,
          searchUrl: `${baseUrl}/admin/zaken/zaak/?q=${openZaakId}`,
        };
      }),
    );
  }
}
