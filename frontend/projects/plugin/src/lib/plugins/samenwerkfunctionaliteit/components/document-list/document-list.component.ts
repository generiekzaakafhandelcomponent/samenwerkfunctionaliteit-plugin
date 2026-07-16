import { Component, inject, signal, WritableSignal } from "@angular/core";
import { DocumentTableComponent } from "./document-table/document-table.component";
import { DocumentService } from "../../service/document.service";
import { SwfDocumentService } from "../../service/swf-document.service";
import { ActivatedRoute } from "@angular/router";
import { Document } from "../../models/document.model";
import { BusinessKey } from "../../models/business-key.model";
import { switchMap, take, tap } from "rxjs";
import { SamenwerkingProperties } from "../../models/samenwerking-properties.model";

@Component({
  selector: "document-list",
  templateUrl: "./document-list.component.html",
  imports: [DocumentTableComponent],
  standalone: true,
  styleUrl: "./document-list.component.scss",
})
export class DocumentListComponent {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService = inject(SwfDocumentService);
  readonly route: ActivatedRoute = inject(ActivatedRoute);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit() {
    const documentId: string = this.swfDocumentService.getParam(this.route, "documentId");
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
