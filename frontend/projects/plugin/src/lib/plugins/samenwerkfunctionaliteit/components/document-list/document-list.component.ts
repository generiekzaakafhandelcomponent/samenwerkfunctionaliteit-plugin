import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentService } from '../../service/document.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/document.model';
import { BusinessKey } from '../../models/business-key.model';
import { finalize, Observable, switchMap, take, tap } from 'rxjs';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { NotificationModule } from 'carbon-components-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { DocumentInterface } from '../../interface/document.interface';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  imports: [DocumentTableComponent, NotificationModule, TranslatePipe],
  standalone: true,
  styleUrl: './document-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  readonly route: ActivatedRoute = inject(ActivatedRoute);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    const documentId: string = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    this.fetchAndLoadDocumenten(documentId);
  }

  private fetchAndLoadDocumenten(documentId: string): void {
    const valtimoBusinessKey: BusinessKey = {
      value: documentId,
    };

    this.swfDocumentService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        tap((samenwerkingProperties: SamenwerkingProperties): void => {
          if (!samenwerkingProperties.samenwerkingId) {
            throw new Error(
              'Er is geen documentenlijst beschikbaar, omdat dit dossier niet deel uitmaakt van een samenwerking.',
            );
          }
        }),
        switchMap(
          (
            samenwerkingProperties: SamenwerkingProperties,
          ): Observable<DocumentInterface[]> => {
            return this.loadDocumenten(samenwerkingProperties.samenwerkingId);
          },
        ),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.hasError.set(false);
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }

  private loadDocumenten(
    samenwerkingId: string,
  ): Observable<DocumentInterface[]> {
    return this.documentService.getDocumenten(samenwerkingId).pipe(
      take(1),
      tap((documenten: DocumentInterface[]): void => {
        this.documents.set(documenten);
      }),
    );
  }
}
