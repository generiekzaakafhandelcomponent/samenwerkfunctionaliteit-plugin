import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentService } from '../../service/document.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';
import { BusinessKey } from '../../models/business-key.model';
import { switchMap, take, tap } from 'rxjs';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { NotificationModule } from 'carbon-components-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  imports: [
    DocumentTableComponent,
    NotificationModule,
    TranslatePipe,
    NgTemplateOutlet,
  ],
  standalone: true,
  styleUrl: './document-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  readonly route: ActivatedRoute = inject(ActivatedRoute);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');

  ngOnInit() {
    const documentId: string = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
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
        tap((samenwerkingProperties) => {
          if (!samenwerkingProperties.samenwerkingId) {
            throw new Error(
              'Er is geen documentenlijst beschikbaar, omdat dit dossier niet deel uitmaakt van een samenwerking.',
            );
          }
        }),
        switchMap((samenwerkingProperties: SamenwerkingProperties) => {
          return this.documentService
            .getDocumenten(samenwerkingProperties.samenwerkingId)
            .pipe(
              take(1),
              tap((documenten) => {
                this.documents.set(documenten);
              }),
            );
        }),
      )
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.hasError.set(false);
        },
        error: (error: Error) => {
          this.isLoading.set(false);
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }
}
