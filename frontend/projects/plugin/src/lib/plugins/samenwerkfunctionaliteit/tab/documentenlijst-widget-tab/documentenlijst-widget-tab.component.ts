import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DocumentListComponent } from '../../components/document-list/document-list.component';
import { NgTemplateOutlet } from '@angular/common';
import { InputModule } from 'carbon-components-angular';
import { OpenZaakUrlService } from '../../service/open-zaak-url.service';
import { SwfDocumentService } from '../../service/swf-document.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, take, tap, throwError } from 'rxjs';

@Component({
  templateUrl: `./documentenlijst-widget-tab.component.html`,
  styleUrl: `./documentenlijst-widget-tab.component.scss`,
  selector: 'swf-documentenlijst-widget-tab',
  imports: [DocumentListComponent, NgTemplateOutlet, InputModule],
})
export class DocumentenlijstWidgetTabComponent {
  private readonly openZaakUrlService: OpenZaakUrlService =
    inject(OpenZaakUrlService);
  private readonly swfDocumentService: SwfDocumentService =
    inject(SwfDocumentService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);

  private openZaakUrl: string = '';
  protected helperText: string = '';

  ngOnInit() {
    this.getOpenZaakInfoAndSetHelperText();
  }

  private getOpenZaakInfoAndSetHelperText() {
    const documentId = this.swfDocumentService.getParam(
      this.route,
      'documentId',
    );

    this.openZaakUrlService
      .getOpenZaakInfo(documentId)
      .pipe(
        take(1),
        tap((openZaakInfo) => {
          this.openZaakUrl = openZaakInfo.searchUrl;
          console.log(this.openZaakUrl);
        }),
        tap(() => {
          this.setHelperText(this.openZaakUrl);
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

  private setHelperText(openZaakUrl: string) {
    this.helperText =
      'Documenten die vanuit GZAC naar de Samenwerkfunctionaliteit worden geüpload, worden daarnaast ook in Open Zaak ' +
      'opgeslagen. De bewaartermijn kan voor het zaaktype dat hier gebruikt worden ingesteld. Dit kan dus verschillen ' +
      'van de vaste bewaartermijn die de Samenwerkfunctionaliteit aanhoudt.' +
      'In Open Zaak worden de documenten per actieverzoek, en niet — zoals in de Samenwerkfunctionaliteit — ' +
      `per samenwerking gegroepeerd. Zie ${openZaakUrl} om de lijst van documenten die zijn ` +
      'opgeslagen in te zien.';
  }
}
