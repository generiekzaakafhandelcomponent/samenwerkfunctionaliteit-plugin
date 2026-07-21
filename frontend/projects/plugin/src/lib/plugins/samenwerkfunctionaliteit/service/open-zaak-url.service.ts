import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpenZaakInfo } from '../interface/open-zaak-info.interface';
import { DocumentService as ValtimoDocumentService } from '@valtimo/document';
import { OpenZaakService } from '@valtimo/resource';
import { SamenwerkfunctionaliteitDocument } from '../interface/document-content.interface';
import { BusinessKey } from '../models/business-key.model';

@Injectable({
  providedIn: 'root',
})
export class OpenZaakUrlService {
  private static readonly OPEN_ZAAK_ID_PATH = 'content.openzaak.identificatie';
  valtimoDocumentService: ValtimoDocumentService = inject(
    ValtimoDocumentService,
  );
  openZaakService: OpenZaakService = inject(OpenZaakService);
  private openZaakInfoCache: Map<string, OpenZaakInfo> = new Map<
    string,
    OpenZaakInfo
  >();

  getOpenZaakInfo(valtimoBusinessKey: BusinessKey): Observable<OpenZaakInfo> {
    if (this.openZaakInfoCache.get(valtimoBusinessKey.value)) {
      return of(this.openZaakInfoCache.get(valtimoBusinessKey.value));
    }
    return forkJoin({
      document: this.valtimoDocumentService.getDocument(
        valtimoBusinessKey.value,
      ),
      zaakTypes: this.openZaakService.getZaakTypes(),
    }).pipe(
      map(({ document, zaakTypes }) => {
        const documentContentWithOpenZaakProperties =
          document.content as SamenwerkfunctionaliteitDocument;
        const openZaakId =
          documentContentWithOpenZaakProperties.openzaak.identificatie;

        if (!openZaakId) {
          throw new Error(
            `OpenZaak ID is not available in the document (searching at '${OpenZaakUrlService.OPEN_ZAAK_ID_PATH}').`,
          );
        }

        const zaakTypeUrl = zaakTypes[0]?.url;

        if (!zaakTypeUrl) {
          throw new Error(`No Zaaktypes found for ${zaakTypeUrl}.`);
        }

        const baseUrl = new URL(zaakTypeUrl).origin;

        return {
          id: openZaakId,
          baseUrl,
          searchUrl: `${baseUrl}/admin/zaken/zaak/?q=${openZaakId}`,
        };
      }),
      tap((openZaakInfo: OpenZaakInfo) => {
        this.loadOpenZaakInfoIntoCache(valtimoBusinessKey, openZaakInfo);
      }),
    );
  }

  private loadOpenZaakInfoIntoCache(
    valtimoBusinessKey: BusinessKey,
    openZaakInfo: OpenZaakInfo,
  ): void {
    this.openZaakInfoCache.set(valtimoBusinessKey.value, openZaakInfo);
  }
}
