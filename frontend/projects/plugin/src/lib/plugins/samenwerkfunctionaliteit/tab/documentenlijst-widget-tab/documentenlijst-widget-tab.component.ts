import { Component, inject, signal } from "@angular/core";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { switchMap, take, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { DocumentService } from "../../service/document.service";
import { SwfDocumentService } from "../../service/swf-document.service";
import { Document } from "../../models/document.model";
import { BusinessKey } from "../../models/business-key.model";
import { SamenwerkingProperties } from "../../models/samenwerking-properties.model";

@Component({
  templateUrl: `./documentenlijst-widget-tab.component.html`,
  selector: "documentenlijst-widget-tab",
  imports: [DocumentListComponent],
})
export class DocumentenlijstWidgetTabComponent {
  private readonly documentService = inject(DocumentService);
  private readonly swfDocumentService = inject(SwfDocumentService);
  readonly route = inject(ActivatedRoute);

  documents = signal<Document[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(this.route, "documentId");
    this.fetchAndLoadDocumenten(documentId);
  }

  private fetchAndLoadDocumenten(documentId: string) {
    const valtimoBusinessKey: BusinessKey = {
      value: documentId,
    };

    this.swfDocumentService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        switchMap((samenwerkingProperties: SamenwerkingProperties) => {
          return this.documentService.getDocumenten(samenwerkingProperties.samenwerkingId).pipe(
            take(1),
            tap((documenten) => {
              this.documents.set(documenten);
            }),
          );
        }),
      )
      .subscribe({
        next: () => this.isLoading.set(false),
      });
  }
}
