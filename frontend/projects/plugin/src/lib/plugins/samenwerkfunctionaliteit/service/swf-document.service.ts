import {inject, Injectable, OnDestroy} from "@angular/core";
import {BusinessKey} from "../models/business-key.model";
import {SamenwerkingProperties} from "../models/samenwerking-properties.model";
import {Document as ValtimoDocument, DocumentService as ValtimoDocumentService} from "@valtimo/document";
import {RouteContext} from "../interface/route-context.interface";
import {catchError, map, Observable, of, Subject, takeUntil, tap, throwError} from "rxjs";
import {SamenwerkfunctionaliteitDocument} from "../interface/document-content.interface";

@Injectable({
  providedIn: "root",
})
export class SwfDocumentService implements OnDestroy {
  private valtimoDocumentService: ValtimoDocumentService = inject(ValtimoDocumentService)
  private samenwerkingIdsCache: Map<string, SamenwerkingProperties> = new Map<string, SamenwerkingProperties>()
  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Extracts a route parameter from the caller's ActivatedRoute.
   * @param context The caller's context(this), which must have an ActivatedRoute injected.
   * @param paramName The name of the route parameter to extract.
   * @returns The parameter value as a string, or null if not found.
   */
  getParam<T extends RouteContext>(context: T, paramName: string): string | null {
    return context.route.snapshot.paramMap.get(paramName);
  }

  /**
   * Gets the samenwerkingIds for a given documentId.
   * If the documentId is not in the cache, it fetches from source.
   * @param valtimoBusinessKey The document ID to look up.
   * @returns The samenwerkingId, or null if not found.
   */
  getSamenwerkingProperties(valtimoBusinessKey: BusinessKey): Observable<SamenwerkingProperties> {
    const samenwerkingProperties = this.samenwerkingIdsCache.get(valtimoBusinessKey.value);
    if (samenwerkingProperties) {
      return of(samenwerkingProperties);
    }
    return this.fetchIdsFromDocument(valtimoBusinessKey);
  }

  private fetchIdsFromDocument(valtimoBusinessKey: BusinessKey): Observable<SamenwerkingProperties> {
    return this.valtimoDocumentService.getDocument(valtimoBusinessKey.value)
      .pipe(
        takeUntil(this.destroy$),
        map((document: ValtimoDocument) => {
          const documentContentWithSamenwerkingProperties = document.content as SamenwerkfunctionaliteitDocument
          return documentContentWithSamenwerkingProperties.samenwerkingProperties;
        }),
        tap((samenwerkingProperties) => {
          if (!samenwerkingProperties) {
            throw new Error('Document content does not have samenwerking properties.');
          }
          this.loadIdsIntoCache(valtimoBusinessKey, samenwerkingProperties)
        }),
        catchError((error: Error) => {
          return throwError(() => error);
        })
      )
  }

  private loadIdsIntoCache(valtimoBusinessKey: BusinessKey, samenwerkingProperties: SamenwerkingProperties): void {
    this.samenwerkingIdsCache.set(valtimoBusinessKey.value, samenwerkingProperties);
  }
}
