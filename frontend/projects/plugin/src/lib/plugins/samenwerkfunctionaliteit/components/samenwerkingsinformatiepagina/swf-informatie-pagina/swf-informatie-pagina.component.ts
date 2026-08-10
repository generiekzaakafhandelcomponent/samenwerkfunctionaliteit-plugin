import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SamenwerkingsStatusComponent } from '../samenwerkingsstatus/samenwerkingsstatus.component';
import { SamenwerkingService } from '../../../service/samenwerking.service';
import {
  finalize,
  forkJoin,
  Observable,
  switchMap,
  take,
  takeWhile,
} from 'rxjs';
import { Samenwerking } from '../../../models/samenwerking.model';
import { SamenwerkingComponent } from '../samenwerking/samenwerking.component';
import { ListItem, LoadingModule } from 'carbon-components-angular';
import { NgClass } from '@angular/common';
import { DocumentListComponent } from '../../document-list/document-list.component';
import { SwfDocumentService } from '../../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessKey, toBusinessKey } from '../../../types/business-key.type';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import { ActieverzoekService } from '../../../service/actieverzoek.service';
import {
  ActieverzoekStatusList,
  ActieverzoekStatusType,
} from '../../../types/actieverzoek-status.type';
import { SamenwerkingProperties } from '../../../models/samenwerking-properties.model';
import { ActieverzoekCardComponent } from '../actieverzoek-card/actieverzoek-card.component';
import { UpdateStatusModalComponent } from '../update-status-modal/update-status-modal.component';

@Component({
  selector: 'swf-informatie-pagina',
  templateUrl: './swf-informatie-pagina.component.html',
  standalone: true,
  imports: [
    SamenwerkingsStatusComponent,
    SamenwerkingComponent,
    LoadingModule,
    NgClass,
    DocumentListComponent,
    ActieverzoekCardComponent,
    UpdateStatusModalComponent,
  ],
  styleUrl: './swf-informatie-pagina.component.scss',
})
export class SwfInformatiePaginaComponent implements OnInit {
  samenwerkingService = inject(SamenwerkingService);
  swfDocumentService = inject(SwfDocumentService);
  actieverzoekService = inject(ActieverzoekService);
  route = inject(ActivatedRoute);

  samenwerking: WritableSignal<Samenwerking> = signal(null);
  isSamenwerkingDossier: WritableSignal<boolean> = signal(false);
  actieverzoek: WritableSignal<Actieverzoek> = signal(null);
  actieverzoekStatusTypes: WritableSignal<ActieverzoekStatusType[]> = signal(
    ActieverzoekStatusList,
  );
  isLoading: WritableSignal<boolean> = signal(true);
  statusTypeDropdownListItems: WritableSignal<ListItem[]> = signal<ListItem[]>(
    [],
  );

  hasError: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    const businessKey = toBusinessKey(documentId);

    this.buildStatusTypeDropdownListItems();
    this.fetchAndLoadSamenwerking(businessKey);
  }

  private fetchAndLoadSamenwerking(businessKey: BusinessKey): void {
    this.swfDocumentService
      .getSamenwerkingProperties(businessKey)
      .pipe(
        switchMap((samenwerkingProps: SamenwerkingProperties) => {
          return forkJoin({
            samenwerking: this.fetchSamenwerking(
              samenwerkingProps.samenwerkingId,
            ),
            actieverzoek: this.fetchActieverzoek(
              samenwerkingProps.actieverzoekDetails.actieverzoekId,
              businessKey,
            ),
          });
        }),
        takeWhile(({ samenwerking, actieverzoek }) => {
          this.isSamenwerkingDossier.set(
            !!actieverzoek.actieverzoekId && !!samenwerking.samenwerkingId,
          );
          return this.isSamenwerkingDossier();
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ samenwerking, actieverzoek }) => {
          this.samenwerking.update(() => samenwerking);
          this.actieverzoek.update(() => actieverzoek);
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
        complete: () => {},
      });
  }

  private fetchSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingService
      .getSamenwerking(samenwerkingId)
      .pipe(take(1));
  }

  private fetchActieverzoek(
    actieverzoekId: string,
    businessKey: BusinessKey,
  ): Observable<Actieverzoek> {
    return this.actieverzoekService
      .getActieverzoek(actieverzoekId, businessKey)
      .pipe(take(1));
  }

  private buildStatusTypeDropdownListItems(): void {
    this.statusTypeDropdownListItems.update(() => {
      return this.mapActieverzoekStatusTypesToListItems();
    });
  }

  private mapActieverzoekStatusTypesToListItems(): ListItem[] {
    return this.actieverzoekStatusTypes().map(
      (actieverzoekStatusType: ActieverzoekStatusType): ListItem => {
        return {
          content: actieverzoekStatusType,
          selected: false,
        };
      },
    );
  }
}
