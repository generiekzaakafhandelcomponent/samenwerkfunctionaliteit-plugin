import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Document as ValtimoDocument,
  DocumentResult,
  DocumentService as ValtimoDocumentService,
  ModifyDocumentRequest,
} from '@valtimo/document';
import { forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { SamenwerkfunctionaliteitDocument } from '../dto/document-content.dto';
import {
  SwfArchiveCopy,
  SwfCaseProperties,
} from '../interface/swf-case-properties.interface';
import { toActieverzoekId } from '../types/actieverzoek-id.type';
import { BusinessKey } from '../types/business-key.type';
import { toOpenZaakId } from '../types/open-zaak-id.type';
import { toSamenwerkingId } from '../types/samenwerking-id.type';
import { Actieverzoek } from '../models/actieverzoek.model';
import { NotificatieService } from './notificatie.service';
import { SamenwerkingService } from './samenwerking.service';
import { BerichtenService } from './berichten.service';
import { isActieverzoekFinalStatus } from '../types/actieverzoek-status.type';

@Injectable({
  providedIn: 'root',
})
export class SwfDocumentService implements OnDestroy {
  private valtimoDocumentService: ValtimoDocumentService = inject(
    ValtimoDocumentService,
  );
  private readonly samenwerkingService = inject(SamenwerkingService);
  private readonly notificatieService = inject(NotificatieService);
  private readonly berichtenService = inject(BerichtenService);

  private samenwerkingPropsCache: Map<BusinessKey, SwfCaseProperties> = new Map<
    BusinessKey,
    SwfCaseProperties
  >();
  private isSamenwerkingCaseCache: Map<BusinessKey, boolean> = new Map<
    BusinessKey,
    boolean
  >();

  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Extracts a route parameter from the caller's ActivatedRoute.
   * @param route The caller's ActivatedRoute, which the caller must have injected.
   * @param paramName The name of the route parameter to extract.
   * @returns The parameter value as a string, or null if not found.
   */
  getParam(route: ActivatedRoute, paramName: string): string | null {
    return route.snapshot.paramMap.get(paramName);
  }

  /**
   * Gets the samenwerkingIds for a given documentId.
   * If the documentId is not in the cache, it fetches from source.
   * @param businessKey The document ID, converted to BusinessKey, to look up.
   * @returns An observable of SwfCaseProperties.
   */
  getSamenwerkingProperties(
    businessKey: BusinessKey,
  ): Observable<SwfCaseProperties> {
    const cachedProperties: SwfCaseProperties | undefined =
      this.samenwerkingPropsCache.get(businessKey);

    if (cachedProperties) {
      return of(cachedProperties);
    }

    return this.valtimoDocumentService.getDocument(businessKey.toString()).pipe(
      map((document) => this.mapValtimoDocumentToSwfCaseProperties(document)),
      tap((swfCaseProperties: SwfCaseProperties) => {
        this.loadPropsIntoCache(businessKey, swfCaseProperties);
      }),
    );
  }

  getIsSamenwerkingCase(businessKey: BusinessKey): Observable<boolean> {
    const cachedIsSwfCase: boolean | undefined =
      this.isSamenwerkingCaseCache.get(businessKey);

    if (cachedIsSwfCase !== undefined) {
      return of(cachedIsSwfCase);
    }

    return this.valtimoDocumentService.getDocument(businessKey.toString()).pipe(
      tap((document) => {
        const props = this.mapValtimoDocumentToSwfCaseProperties(document);
        this.loadPropsIntoCache(businessKey, props);
      }),
      map((document) => {
        const swfDocument =
          document.content as SamenwerkfunctionaliteitDocument;

        return swfDocument.isAutomaticallyGenerated;
      }),
      tap((isSwfCase) => {
        this.loadIsSwfCaseIntoCache(businessKey, isSwfCase);
      }),
    );
  }

  /**
   * Saves an SwfArchiveCopy to the document using the supplied businessKey and actieverzoek.
   * this method asserts that if the actieverzoek status has reached a "final" status,
   * otherwise returns an observable of it's supplied actieverzoek
   * @param documentId The document ID, converted to BusinessKey, to look up.
   * @param actieverzoek The actieverzoek that has reached a final status.
   * @returns An observable of the supplied Actieverzoek, whether the copy was saved or not.
   */
  saveSwfArchiveCopyToDocument(
    documentId: BusinessKey,
    actieverzoek: Actieverzoek,
  ): Observable<Actieverzoek> {
    if (!isActieverzoekFinalStatus(actieverzoek.status)) {
      return of(actieverzoek);
    } else {
      return forkJoin({
        swfArchiveCopy: this.aggregateSwfDataToSwfArchiveCopy(actieverzoek),
        valtimoDoc: this.valtimoDocumentService.getDocument(
          documentId.toString(),
        ),
      }).pipe(
        switchMap((data) =>
          this.modify(data.valtimoDoc, documentId, data.swfArchiveCopy),
        ),
        map(() => {
          return actieverzoek;
        }),
      );
    }
  }

  private mapValtimoDocumentToSwfCaseProperties(
    document: ValtimoDocument,
  ): SwfCaseProperties {
    const swfDocument = document.content as SamenwerkfunctionaliteitDocument;

    return {
      samenwerkingId: toSamenwerkingId(
        swfDocument.samenwerkingProperties.samenwerkingId,
      ),
      actieverzoekId: toActieverzoekId(
        swfDocument.samenwerkingProperties.actieverzoekDetails.actieverzoekId,
      ),
      isSwfCase: swfDocument.isAutomaticallyGenerated,
      openZaakId: toOpenZaakId(swfDocument.openzaak.identificatie),
    };
  }

  private loadPropsIntoCache(
    businessKey: BusinessKey,
    samenwerkingProperties: SwfCaseProperties,
  ): void {
    this.samenwerkingPropsCache.set(businessKey, samenwerkingProperties);
  }

  private loadIsSwfCaseIntoCache(
    businessKey: BusinessKey,
    isSwfCase: boolean,
  ): void {
    this.isSamenwerkingCaseCache.set(businessKey, isSwfCase);
  }

  private aggregateSwfDataToSwfArchiveCopy(
    actieverzoek: Actieverzoek,
  ): Observable<SwfArchiveCopy> {
    return forkJoin({
      samenwerking: this.samenwerkingService.getSamenwerking(
        actieverzoek.samenwerkingId,
      ),
      notificaties: this.notificatieService.getAllNotificaties(
        actieverzoek.samenwerkingId,
      ),
      berichten: this.berichtenService.getBerichten(
        actieverzoek.actieverzoekId,
      ),
    }).pipe(
      map((aggregate): SwfArchiveCopy => {
        return {
          dateTime: new Date(),
          samenwerking: aggregate.samenwerking,
          actieverzoek: actieverzoek,
          notificaties: aggregate.notificaties,
          berichten: aggregate.berichten,
        };
      }),
    );
  }

  private modify(
    document: ValtimoDocument,
    businessKey: BusinessKey,
    swfArchiveCopy: SwfArchiveCopy,
  ): Observable<DocumentResult> {
    const request: ModifyDocumentRequest = {
      content: this.mergeSwfContentWith(
        this.contentOf(document),
        swfArchiveCopy,
      ),
      documentId: businessKey.toString(),
      versionBasedOn: document.version,
    };
    return this.valtimoDocumentService.modifyDocument(request);
  }

  private mergeSwfContentWith(
    content: SwfCaseProperties,
    data: SwfArchiveCopy,
  ): SwfCaseProperties {
    return {
      ...content,
      archiveringskopie: {
        dateTime: data.dateTime,
        samenwerking: data.samenwerking,
        actieverzoek: data.actieverzoek,
        notificaties: data.notificaties,
        berichten: data.berichten,
      },
    };
  }

  private contentOf(document: ValtimoDocument): SwfCaseProperties {
    return document.content as SwfCaseProperties;
  }
}
