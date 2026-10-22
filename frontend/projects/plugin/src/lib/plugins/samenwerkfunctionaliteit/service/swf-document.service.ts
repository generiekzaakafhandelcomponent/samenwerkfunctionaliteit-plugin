import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Document as ValtimoDocument,
  DocumentResult,
  DocumentService as ValtimoDocumentService,
  ModifyDocumentRequest,
} from '@valtimo/document';
import { forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import {
  SamenwerkfunctionaliteitDocument,
  SwfArchiveCopy,
} from '../dto/document-content.dto';
import { SwfCaseProperties } from '../interface/swf-case-properties.interface';
import { toActieverzoekId } from '../types/actieverzoek-id.type';
import { BusinessKey } from '../types/business-key.type';
import { toOpenZaakId } from '../types/open-zaak-id.type';
import { toSamenwerkingId } from '../types/samenwerking-id.type';
import { NotificatieService } from './notificatie.service';
import { SamenwerkingService } from './samenwerking.service';
import { BerichtenService } from './berichten.service';
import { ActieverzoekService } from './actieverzoek.service';
import { mapMessageToBericht } from '../mapper/bericht.mapper';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class SwfDocumentService implements OnDestroy {
  private valtimoDocumentService: ValtimoDocumentService = inject(
    ValtimoDocumentService,
  );
  private readonly samenwerkingService = inject(SamenwerkingService);
  private readonly actieverzoekService = inject(ActieverzoekService);
  private readonly notificatieService = inject(NotificatieService);
  private readonly berichtenService = inject(BerichtenService);
  private readonly logger = inject(NGXLogger);

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
   * Saves an SwfArchiveCopy to the document using the given businessKey,
   * and returns the given value as observable. This method only saves if an
   * archiveringskopie is not already saved in the document.
   * @param documentId The document ID, converted to BusinessKey, to look up.
   * @param swfCaseProperties
   * @param value Value to continue as observable stream.
   * @returns An observable, whether the copy was saved or not.
   */
  saveSwfArchiveCopyToDocument<T>(
    documentId: BusinessKey,
    swfCaseProperties: SwfCaseProperties,
    value: T,
  ): Observable<T> {
    return forkJoin({
      swfArchiveCopy: this.aggregateSwfDataToSwfArchiveCopy(swfCaseProperties),
      valtimoDoc: this.valtimoDocumentService.getDocument(
        documentId.toString(),
      ),
    }).pipe(
      switchMap((data) => {
        if (!this.swfDocumentContentOf(data.valtimoDoc).archiveringskopie) {
          return this.modify(data.valtimoDoc, documentId, data.swfArchiveCopy);
        } else {
          this.logger.info(
            `Skipping saving SWF archive copy for ${documentId}; already exists.`,
          );
          return of(value);
        }
      }),
      map(() => value),
    );
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
      openZaakId: toOpenZaakId(swfDocument.openzaak?.identificatie ?? ''),
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
    swfCaseProperties: SwfCaseProperties,
  ): Observable<SwfArchiveCopy> {
    return forkJoin({
      samenwerking: this.samenwerkingService.getSamenwerking(
        swfCaseProperties.samenwerkingId,
      ),
      actieverzoek: this.actieverzoekService.getActieverzoek(
        toActieverzoekId(swfCaseProperties.actieverzoekId),
      ),
      notificaties: this.notificatieService.getAllNotificaties(
        swfCaseProperties.samenwerkingId,
      ),
      messages: this.berichtenService.getMessages(
        swfCaseProperties.actieverzoekId,
      ),
    }).pipe(
      map((swfArchiveCopy): SwfArchiveCopy => {
        return {
          dateTime: new Date(),
          samenwerking: swfArchiveCopy.samenwerking,
          actieverzoek: swfArchiveCopy.actieverzoek,
          notificaties: swfArchiveCopy.notificaties,
          berichten: swfArchiveCopy.messages.map(mapMessageToBericht),
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
        this.swfDocumentContentOf(document),
        swfArchiveCopy,
      ),
      documentId: businessKey.toString(),
      versionBasedOn: document.version,
    };
    return this.valtimoDocumentService.modifyDocument(request);
  }

  private mergeSwfContentWith(
    content: SamenwerkfunctionaliteitDocument,
    data: SwfArchiveCopy,
  ): SamenwerkfunctionaliteitDocument {
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

  private swfDocumentContentOf(
    document: ValtimoDocument,
  ): SamenwerkfunctionaliteitDocument {
    return document.content as SamenwerkfunctionaliteitDocument;
  }
}
