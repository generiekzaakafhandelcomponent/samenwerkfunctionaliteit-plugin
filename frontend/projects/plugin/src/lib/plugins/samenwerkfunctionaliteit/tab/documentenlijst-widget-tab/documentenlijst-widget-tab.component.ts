import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputModule, NotificationModule } from 'carbon-components-angular';
import { catchError, finalize, take, tap, throwError } from 'rxjs';
import { DocumentListComponent } from '../../components/document-list/document-list.component';
import { SwfCaseProperties } from '../../interface/swf-case-properties.interface';
import { OpenZaakUrlService } from '../../service/open-zaak-url.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { toBusinessKey } from '../../types/business-key.type';

@Component({
  templateUrl: `./documentenlijst-widget-tab.component.html`,
  styleUrl: `./documentenlijst-widget-tab.component.scss`,
  selector: 'swf-documentenlijst-widget-tab',
  imports: [
    DocumentListComponent,
    InputModule,
    TranslateModule,
    NotificationModule,
  ],
})
export class DocumentenlijstWidgetTabComponent implements OnInit {
  private readonly openZaakUrlService: OpenZaakUrlService =
    inject(OpenZaakUrlService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly documentId = this.swfDocumentService.getParam(
    this.route,
    'documentId',
  );

  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
  protected isSamenwerkingDossier: WritableSignal<boolean> = signal(false);
  protected hasOpenZaakId = signal<boolean>(false);

  protected openZaakUrl: string = '';

  ngOnInit() {
    this.getOpenZaakInfo(this.documentId);
    this.setIsSamenwerkingDossier(this.documentId);
  }

  private getOpenZaakInfo(documentId: string) {
    const businessKey = toBusinessKey(documentId);

    this.openZaakUrlService
      .getOpenZaakInfo(businessKey)
      .pipe(
        take(1),
        tap((openZaakInfo) => {
          if (!!openZaakInfo.id) {
            this.hasOpenZaakId.set(true);
            this.openZaakUrl = openZaakInfo.searchUrl;
          }
        }),
        catchError((err) => {
          return throwError(() => {
            return err;
          });
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        error: (error: Error) => {
          console.error(error);
        },
      });
  }

  private setIsSamenwerkingDossier(documentId: string) {
    this.swfDocumentService
      .getSamenwerkingProperties(toBusinessKey(documentId))
      .pipe(
        take(1),
        tap((samenwerkingProperties: SwfCaseProperties) => {
          this.isSamenwerkingDossier.set(samenwerkingProperties.isSwfCase);
        }),
      )
      .subscribe();
  }
}
