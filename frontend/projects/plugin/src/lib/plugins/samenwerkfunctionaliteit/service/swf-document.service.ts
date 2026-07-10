import {inject, Injectable, OnDestroy} from "@angular/core";
import {BusinessKey} from "../models/business-key.model";
import {SamenwerkingProperties} from "../models/samenwerking-properties.model";
import {Document as ValtimoDocument, DocumentService as ValtimoDocumentService} from "@valtimo/document";
import {catchError, map, Observable, of, Subject, takeUntil, tap, throwError} from "rxjs";
import {SamenwerkfunctionaliteitDocument} from "../interface/document-content.interface";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SwfDocumentService implements OnDestroy {
  private valtimoDocumentService: ValtimoDocumentService = inject(ValtimoDocumentService)
  private samenwerkingPropsCache: Map<string, SamenwerkingProperties> = new Map<string, SamenwerkingProperties>()
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
   * @param valtimoBusinessKey The document ID to look up.
   * @returns The samenwerkingId, or null if not found.
   */
  getSamenwerkingProperties(valtimoBusinessKey: BusinessKey): Observable<SamenwerkingProperties> {
    const samenwerkingProperties = this.samenwerkingPropsCache.get(valtimoBusinessKey.value);
    if (samenwerkingProperties) {
      return of(samenwerkingProperties);
    }
    return this.fetchPropsFromDocument(valtimoBusinessKey);
  }

  private fetchPropsFromDocument(valtimoBusinessKey: BusinessKey): Observable<SamenwerkingProperties> {
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
          this.loadPropsIntoCache(valtimoBusinessKey, samenwerkingProperties)
        }),
        catchError((error: Error) => {
          return throwError(() => error);
        })
      )
  }

  private loadPropsIntoCache(valtimoBusinessKey: BusinessKey, samenwerkingProperties: SamenwerkingProperties): void {
    this.samenwerkingPropsCache.set(valtimoBusinessKey.value, samenwerkingProperties);
  }
}
