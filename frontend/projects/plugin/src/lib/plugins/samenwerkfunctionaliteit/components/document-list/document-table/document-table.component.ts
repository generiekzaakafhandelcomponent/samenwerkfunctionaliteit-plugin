import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ButtonModule,
  IconModule,
  PaginationModule,
  PlaceholderModule,
  TableHeaderItem,
  TableItem,
  TableModel,
  TableModule,
} from 'carbon-components-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Document } from '../../../models/document.model';
import { NgIf } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'document-table',
  imports: [
    TableModule,
    ReactiveFormsModule,
    PaginationModule,
    NgIf,
    ButtonModule,
    IconModule,
    PlaceholderModule,
    TranslatePipe,
  ],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentTableComponent implements OnInit {
  private readonly translateService: TranslateService =
    inject(TranslateService);

  documents: InputSignal<Document[]> = input<Document[]>([]);
  isSkeleton: InputSignal<boolean> = input<boolean>(true);
  model: WritableSignal<TableModel> = signal(new TableModel());
  isUploading: WritableSignal<boolean> = signal(false);
  searchValue: WritableSignal<string> = signal('');

  showSelectionColumn: boolean = true;
  striped: boolean = false;

  ngOnInit(): void {
    this.setTableModelDataAndHeader(this.documents());
  }

  protected selectPage(page: number): void {
    this.model.update((model: TableModel): TableModel => {
      model.data = this.getTableItemsForPage(page);
      model.currentPage = page;
      return model;
    });
  }

  protected deleteDocument() {}

  protected downloadDocument() {}

  protected uploadDocument() {
    this.isUploading.set(true);
    setTimeout(() => {
      this.isUploading.set(false);
    }, 1500);
  }

  protected filterFileNames(fileName: string) {
    this.searchValue.update(() => {
      return fileName;
    });
  }

  private getTableItemsForPage(page: number): TableItem[][] {
    const documents: Document[] = this.documents();
    const startIndex: number = (page - 1) * this.model().pageLength;
    const endIndex: number = Math.min(
      page * this.model().pageLength,
      this.model().totalDataLength,
    );

    const pageDocuments: Document[] = documents.slice(startIndex, endIndex);

    return pageDocuments.map((document: Document) => [
      new TableItem({ data: document.fileName }),
      new TableItem({ data: document.confidentialityLevel }),
      new TableItem({
        data: new Date(document.creationDate).toLocaleDateString(),
      }),
    ]);
  }

  private setTableModelDataAndHeader(documents: Document[]): void {
    this.model.update((model: TableModel): TableModel => {
      model.totalDataLength = documents.length;
      model.header = this.createTableHeadersForTableModel();
      model.isRowFiltered = (index: number) => {
        const fileName = model.row(index)[0].data;
        return !fileName
          .toLowerCase()
          .includes(this.searchValue().toLowerCase());
      };

      return model;
    });

    this.selectPage(1);
  }

  private createTableHeadersForTableModel(): TableHeaderItem[] {
    return [
      new TableHeaderItem({
        data: this.translateService.instant(
          'samenwerkfunctionaliteit.documenttable.fileName',
        ),
      }),
      new TableHeaderItem({
        data: this.translateService.instant(
          'samenwerkfunctionaliteit.documenttable.confidentialityType',
        ),
      }),
      new TableHeaderItem({
        data: this.translateService.instant(
          'samenwerkfunctionaliteit.documenttable.dateCreated',
        ),
      }),
    ];
  }
}
