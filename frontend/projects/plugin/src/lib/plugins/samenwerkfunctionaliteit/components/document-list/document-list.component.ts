import { Component, input, InputSignal, OnInit, signal, WritableSignal } from "@angular/core";
import { ButtonModule, IconModule, PaginationModule, TableHeaderItem, TableItem, TableModel, TableModule } from "carbon-components-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { Document } from "../../models/document.model";
import { NgIf } from "@angular/common";

@Component({
  selector: "document-list",
  imports: [TableModule, ReactiveFormsModule, PaginationModule, NgIf, ButtonModule, IconModule],
  templateUrl: "./document-list.component.html",
  styleUrl: "./document-list.component.css",
})
export class DocumentListComponent implements OnInit {
  documents: InputSignal<Document[]> = input<Document[]>([]);
  isSkeleton: InputSignal<boolean> = input<boolean>(true);
  public model: WritableSignal<TableModel> = signal(new TableModel());

  ngOnInit(): void {
    console.log(this.documents());
    this.setTableModelDataAndHeader(this.documents());
  }

  private setTableModelDataAndHeader(documents: Document[]): void {
    this.model().data = this.createTableItemsForTableModel(documents);
    this.model().header = this.createTableHeadersForTableModel();
  }

  private createTableItemsForTableModel(documents: Document[]): TableItem[][] {
    return documents.map((document: Document): TableItem[] => [
      new TableItem({ data: document.fileName }),
      new TableItem({ data: document.confidentialityLevel }),
      new TableItem({ data: document.creationDate }),
    ]);
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
