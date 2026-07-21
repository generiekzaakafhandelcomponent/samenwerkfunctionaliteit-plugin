import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { SamenwerkingsStatusComponent } from "../samenwerkingsstatus/samenwerkingsstatus.component";
import { SamenwerkingService } from "../../../service/samenwerking.service";
import { Observable, Subject, switchMap, take } from "rxjs";
import { Samenwerking } from "../../../models/samenwerking.model";
import { SamenwerkingComponent } from "../samenwerking/samenwerking.component";
import { LoadingModule } from "carbon-components-angular";
import { NgClass } from "@angular/common";
import { DocumentListComponent } from "../../document-list/document-list.component";
import { SwfDocumentService } from "../../../service/swf-document.service";
import { ActivatedRoute } from "@angular/router";
import { BusinessKey } from "../../../models/business-key.model";

@Component({
  selector: "swf-informatie-pagina",
  templateUrl: "./swf-informatie-pagina.component.html",
  standalone: true,
  imports: [SamenwerkingsStatusComponent, SamenwerkingComponent, LoadingModule, NgClass, DocumentListComponent],
  styleUrl: "./swf-informatie-pagina.component.scss",
})
export class SwfInformatiePaginaComponent implements OnInit {
  samenwerkingService = inject(SamenwerkingService);
  swfDocumentService = inject(SwfDocumentService);
  route = inject(ActivatedRoute);

  samenwerking: WritableSignal<Samenwerking> = signal(null);
  isLoading: WritableSignal<boolean> = signal(true);

  hasError: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal("");

  destroyRef: DestroyRef = inject(DestroyRef);
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(this.route, "documentId");
    this.fetchAndLoadSamenwerking(documentId);
    this.destroyRef.onDestroy(() => this.destroy$.next());
  }

  private fetchAndLoadSamenwerking(documentId: string): void {
    const valtimoBusinessKey: BusinessKey = {
      value: documentId,
    };

    this.swfDocumentService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        switchMap((samenwerkingProps) => {
          return this.fetchSamenwerking(samenwerkingProps.samenwerkingId);
        }),
      )
      .subscribe({
        next: (samenwerking: Samenwerking) => {
          this.isLoading.set(false);
          this.samenwerking.update(() => samenwerking);
        },
        error: (error: Error) => {
          this.isLoading.set(false);
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }

  private fetchSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingService.getSamenwerking(samenwerkingId).pipe(take(1));
  }
}
