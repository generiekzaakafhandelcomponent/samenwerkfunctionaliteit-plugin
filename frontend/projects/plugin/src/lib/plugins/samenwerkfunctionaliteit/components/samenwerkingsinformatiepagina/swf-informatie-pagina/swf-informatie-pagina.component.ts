import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SamenwerkingsStatusComponent } from '../samenwerkingsstatus/samenwerkingsstatus.component';
import { SamenwerkingService } from '../../../service/samenwerking.service';
import { finalize, forkJoin, Observable, switchMap, take, tap } from 'rxjs';
import { Samenwerking } from '../../../models/samenwerking.model';
import { SamenwerkingComponent } from '../samenwerking/samenwerking.component';
import { LoadingModule } from 'carbon-components-angular';
import { NgClass } from '@angular/common';
import { DocumentListComponent } from '../../document-list/document-list.component';
import { SwfDocumentService } from '../../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessKey, toBusinessKey } from '../../../types/business-key.type';
import { UpdateActieverzoekStatusComponent } from '../update-actieverzoek-status/update-actieverzoek-status.component';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import { ActieverzoekService } from '../../../service/actieverzoek.service';
import {
  ActieverzoekStatusType,
  ActieverzoekStatusTypes,
} from '../../../types/actieverzoek-status.type';
import { SamenwerkingProperties } from '../../../models/samenwerking-properties.model';

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
    UpdateActieverzoekStatusComponent,
  ],
  styleUrl: './swf-informatie-pagina.component.scss',
})
export class SwfInformatiePaginaComponent implements OnInit {
  samenwerkingService = inject(SamenwerkingService);
  swfDocumentService = inject(SwfDocumentService);
  actieverzoekService = inject(ActieverzoekService);
  route = inject(ActivatedRoute);

  samenwerking: WritableSignal<Samenwerking> = signal(null);
  actieverzoek: WritableSignal<Actieverzoek> = signal(null);
  actieverzoekStatusTypes: WritableSignal<ActieverzoekStatusType[]> = signal(
    [],
  );
  isLoading: WritableSignal<boolean> = signal(true);

  hasError: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );
    const businessKey = toBusinessKey(documentId);

    this.fetchAndLoadSamenwerking(businessKey);
  }

  private buildActieverzoekStatusList() {
    this.actieverzoekStatusTypes.update((): ActieverzoekStatusType[] => {
      return [
        ActieverzoekStatusTypes.OPEN,
        ActieverzoekStatusTypes.IN_PROGRESS,
        ActieverzoekStatusTypes.REJECTED,
        ActieverzoekStatusTypes.WITHDRAWN,
        ActieverzoekStatusTypes.REPORTED_READY,
        ActieverzoekStatusTypes.READY,
      ];
    });
  }

  private fetchAndLoadSamenwerking(businessKey: BusinessKey): void {
    this.swfDocumentService
      .getSamenwerkingProperties(businessKey)
      .pipe(
        take(1),
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
        tap(({ samenwerking, actieverzoek }) => {
          if (!actieverzoek) {
            throw new Error('Document content does not have an actieverzoek.');
          }
          if (!samenwerking) {
            throw new Error('Document content does not have an samenwerking.');
          }
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ samenwerking, actieverzoek }) => {
          this.samenwerking.update(() => samenwerking);
          this.actieverzoek.update(() => actieverzoek);
          this.buildActieverzoekStatusList();
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
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
}
