import {inject, Injectable, OnDestroy, signal, WritableSignal} from "@angular/core";
import {BusinessKey} from "../models/business-key.model";
import {SamenwerkingIds} from "../models/samenwerking-ids.model";
import {Document as ValtimoDocument, DocumentService as ValtimoDocumentService} from "@valtimo/document";
import {RouteContext} from "../interface/route-context.interface";
import {catchError, map, Subject, takeUntil, tap, throwError} from "rxjs";
import {DocumentContentWithSamenwerkingIds} from "../interface/document-content.interface";

@Injectable({
  providedIn: "root",
})
export class DocumentService implements OnDestroy {
  private valtimoDocumentService: ValtimoDocumentService = inject(ValtimoDocumentService)
  private samenwerkingIdsCache: Map<string, SamenwerkingIds> = new Map<string, SamenwerkingIds>()
  private isSamenwerkingIdsFetched: WritableSignal<boolean> = signal(false);
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
   * Gets the samenwerkingId for a given documentId.
   * If the documentId is not in the cache, returns null.
   * @param valtimoBusinessKey The document ID to look up.
   * @returns The samenwerkingId, or null if not found.
   */
  getSamenwerkingId(valtimoBusinessKey: BusinessKey): string | null {
    const samenwerkingId = this.samenwerkingIdsCache.get(valtimoBusinessKey.value).samenwerkingId;
    if (samenwerkingId !== null) {
      return samenwerkingId;
    }

    this.fetchIdsFromDocument(valtimoBusinessKey);

    if (this.isSamenwerkingIdsFetched()) {
      this.isSamenwerkingIdsFetched.set(false);
      return this.samenwerkingIdsCache.get(valtimoBusinessKey.value).samenwerkingId;
    }

    return null;
  }

  private fetchIdsFromDocument(valtimoBusinessKey: BusinessKey): void {
    this.valtimoDocumentService.getDocument(valtimoBusinessKey.value)
      .pipe(
        takeUntil(this.destroy$),
        map((document: ValtimoDocument) => {
          return document.content as DocumentContentWithSamenwerkingIds;
        }),
        tap((content) => {
          if (!content.samenwerkingIds) {
            throw new Error('Document content does not have samenwerkingIds.');
          }
        }),
        catchError((error: Error) => {
          return throwError(() => error);
        })
      )
      .subscribe({
          next: (content: DocumentContentWithSamenwerkingIds) => {
            this.loadIdsIntoCache(valtimoBusinessKey, content.samenwerkingIds)
            this.isSamenwerkingIdsFetched.set(true);
          },
          error: (error: Error) => {
            console.error('Failed to fetch: ', error.message);
          }
        }
      )
  }

  private loadIdsIntoCache(valtimoBusinessKey: BusinessKey, samenwerkingIds: SamenwerkingIds): void {
    this.samenwerkingIdsCache.set(valtimoBusinessKey.value, samenwerkingIds);
  }
}
