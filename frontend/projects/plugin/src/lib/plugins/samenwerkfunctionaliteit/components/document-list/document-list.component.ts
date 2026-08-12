import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationModule } from 'carbon-components-angular';
import { finalize, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { DocumentInterface } from '../../interface/document.interface';
import { Document } from '../../models/document.model';
import { SamenwerkingProperties } from '../../models/samenwerking-properties.model';
import { DocumentService } from '../../service/document.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { UserNotificationService } from '../../service/user-notification.service';

import { DocumentService as ValtimoDocumentService } from '@valtimo/document';
import { UploadWorkFlowService } from '../../service/upload-workflow.service';
import { BusinessKey, toBusinessKey } from '../../types/business-key.type';
import { toUUID } from '../../types/uuid.type';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentTableLightComponent } from './document-table/light/document-table-light.component';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  imports: [
    DocumentTableComponent,
    NotificationModule,
    DocumentTableLightComponent,
  ],
  styleUrl: './document-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly notificationService: UserNotificationService = inject(
    UserNotificationService,
  );
  private readonly valtimoDocumentService: ValtimoDocumentService = inject(
    ValtimoDocumentService,
  );
  private readonly uploadWorkFlowService: UploadWorkFlowService = inject(
    UploadWorkFlowService,
  );

  private businessKey?: BusinessKey;
  private caseDefinitionKey?: string;
  private caseDefinitionVersionTag?: string;

  isLightMode: InputSignal<boolean> = input<boolean>(false);

  documents: WritableSignal<Document[]> = signal<Document[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit(): void {
    this.businessKey = toBusinessKey(
      this.swfDocumentService.getParam(this.route, 'documentId') ?? '',
    );

    this.caseDefinitionKey =
      this.swfDocumentService.getParam(this.route, 'caseDefinitionKey') ?? '';

    console.log(
      'businessKey: ',
      this.businessKey,
      'caseDefinitionKey',
      this.caseDefinitionKey,
      'caseDefinitionVersionTag',
      this.caseDefinitionVersionTag,
    );
    this.fetchDocumenten(this.businessKey.toString());
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const businessKey = this.businessKey;
    const caseDefinitionKey = this.caseDefinitionKey;

    if (!businessKey || !caseDefinitionKey) {
      return;
    }

    const versionTag$ = this.caseDefinitionVersionTag
      ? of(this.caseDefinitionVersionTag)
      : this.getCaseDefinitionVersionTag(businessKey);

    versionTag$
      .pipe(
        switchMap((versionTag) =>
          this.uploadWorkFlowService.startUpload({
            file,
            samenwerkingId: 'SAM-66497',
            businessKey,
            caseDefinitionKey,
            caseDefinitionVersionTag: versionTag,
          }),
        ),
        take(1),
      )
      .subscribe();
  }

  protected downloadDocument(documentId: string): void {
    const fileDownloadSubscription = this.documentService
      .downloadDocument(toUUID(documentId))
      .pipe(take(1))
      .subscribe();

    this.destroyRef.onDestroy(() => {
      fileDownloadSubscription.unsubscribe();
    });
  }

  private getCaseDefinitionVersionTag(
    businessKey: BusinessKey,
  ): Observable<string> {
    return this.valtimoDocumentService.getDocument(businessKey.toString()).pipe(
      take(1),
      map((document) => {
        const versionTag =
          document.definitionId?.blueprintId.blueprintVersionTag;

        if (!versionTag) {
          throw new Error(
            `No version tag was found for ${document.definitionName}`,
          );
        }

        return versionTag;
      }),
    );
  }

  private fetchDocumenten(documentId: string): void {
    const businessKey = toBusinessKey(documentId);

    this.swfDocumentService
      .getSamenwerkingProperties(businessKey)
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
            return this.documentService
              .getDocumenten(samenwerkingProperties.samenwerkingId)
              .pipe(
                take(1),
                tap((documenten: DocumentInterface[]): void => {
                  this.documents.set(documenten);
                }),
              );
          },
        ),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError({
            titleKey:
              'samenwerkfunctionaliteit.feedback.userNotification.fetchDocumentFailureTitle',
          });
          throw error;
        },
      });
  }
}
