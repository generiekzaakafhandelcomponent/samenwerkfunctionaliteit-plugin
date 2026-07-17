import { Component, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import {
  ButtonModule,
  IconModule,
  PaginationModule,
  PlaceholderModule,
  TableHeaderItem,
  TableItem,
  TableModel,
  TableModule,
} from "carbon-components-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { Document } from "../../../models/document.model";
import { NgIf } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "document-table",
  imports: [TableModule, ReactiveFormsModule, PaginationModule, NgIf, ButtonModule, IconModule, PlaceholderModule, TranslatePipe],
  templateUrl: "./document-table.component.html",
  styleUrl: "./document-table.component.css",
})
export class DocumentTableComponent implements OnInit {
  documents: InputSignal<Document[]> = input<Document[]>([]);
  isSkeleton: InputSignal<boolean> = input<boolean>(true);
  model: WritableSignal<TableModel> = signal(new TableModel());
  isUploading: WritableSignal<boolean> = signal(false);

  showSelectionColumn: boolean = true;
  striped: boolean = false;

  ngOnInit(): void {
    this.setTableModelDataAndHeader(this.documents());
  }

  selectPage(page: number) {
    this.model().data = this.getPage(page);
    this.model().currentPage = page;
  }

  protected deleteDocument() {}

  protected downloadDocument() {}

  protected uploadDocument() {
    this.isUploading.set(true);
    setTimeout(() => {
      this.isUploading.set(false);
    }, 3000);
  }

  private getPage(page: number): TableItem[][] {
    const documents: Document[] = this.documents();
    const startIndex: number = (page - 1) * this.model().pageLength;
    const endIndex: number = Math.min(page * this.model().pageLength, this.model().totalDataLength);

    const pageDocuments: Document[] = documents.slice(startIndex, endIndex);

    return pageDocuments.map((document: Document) => [
      new TableItem({ data: document.fileName }),
      new TableItem({ data: document.confidentialityLevel }),
      new TableItem({ data: document.creationDate }),
    ]);
  }

  private setTableModelDataAndHeader(documents: Document[]): void {
    this.model().totalDataLength = documents.length;
    this.model().header = this.createTableHeadersForTableModel();
    this.selectPage(1);
  }

  //TODO translations
  private createTableHeadersForTableModel(): TableHeaderItem[] {
    return [
      new TableHeaderItem({
        data: "Bestandsnaam",
      }),
      new TableHeaderItem({
        data: "Vertrouwelijkheidsaanduiding",
      }),
      new TableHeaderItem({
        data: "Datum aangemaakt",
      }),
    ];
  }
}
