import {Component, inject, signal, WritableSignal} from '@angular/core';
import {NotificatieComponent} from "../../components/notificaties-lijst/notificatie/notificatie.component";
import {NotificatieCardInput} from "../../components/notificaties-lijst/interface/notificatie-card.interface";
import {NotificatieService} from "../../service/notificatie.service";
import {Observable, switchMap, take} from "rxjs";
import {Notificatie} from "../../models/notificatie.model";
import {getNotificationCardTypeByNotificationType} from "../../components/notificaties-lijst/config/notificatie-type-config";
import {LoadingModule, SkeletonModule} from "carbon-components-angular";
import {SwfDocumentService} from "../../service/swf-document.service";
import {ActivatedRoute} from "@angular/router";
import {BusinessKey} from "../../models/business-key.model";

@Component({
  templateUrl: `notificaties-custom-tab.component.html`,
  styleUrl: './notificaties-custom-tab.component.scss',
  imports: [NotificatieComponent, LoadingModule, SkeletonModule],
  selector: "notificaties-custom-tab",
})
export class NotificatiesCustomTabComponent {
  notificatieService: NotificatieService = inject(NotificatieService);
  swfDocumentService: SwfDocumentService = inject(SwfDocumentService);
  route: ActivatedRoute = inject(ActivatedRoute);
  notifications: WritableSignal<Notificatie[]> = signal<Notificatie[]>([]);
  inputs: WritableSignal<NotificatieCardInput[]> = signal<NotificatieCardInput[]>([]);
  isLoading: WritableSignal<boolean> = signal(true);
  itemsPerPage = 10;
  itemsPerPageArray: number[] = Array.from({length: this.itemsPerPage});

  ngOnInit() {
    const documentId = this.swfDocumentService.getParam(this.route, 'documentId');
    this.fetchAndLoadNotifications(documentId);
  }

  private fetchAndLoadNotifications(documentId: string): void {
    const valtimoBusinessKey: BusinessKey = {
      value: documentId,
    }

    this.swfDocumentService.getSamenwerkingProperties(valtimoBusinessKey).pipe(
      take(1),
      switchMap((samenwerkingProperties) => {
        return this.fetchNotifications(samenwerkingProperties.samenwerkingId)
      })
    ).subscribe(notificaties => {
      this.notifications.set(notificaties)
      this.loadInputs(this.notifications());
    })
  }

  private fetchNotifications(samenwerkingId: string): Observable<Notificatie[]> {
    return this.notificatieService.getNotificaties(samenwerkingId)
      .pipe(take(1))
  }

  private loadInputs(notificaties: Notificatie[]): void {
    this.inputs.set(notificaties.map((notificatie) => {
      return this.mapNotificatieToNotificatieCardInput(notificatie)
    }))
    this.isLoading.set(false);
  }

  private mapNotificatieToNotificatieCardInput(
    notificatie: Notificatie
  ): NotificatieCardInput {
    const type = getNotificationCardTypeByNotificationType(notificatie.notificatieType)

    const eventDateTime = new Date(notificatie.eventDatumTijd);

    return {
      notificatieId: notificatie.notificatieId,
      type: type,
      title: notificatie.notificatieTitel,
      eventDateTime: eventDateTime,
      initiatorNaam: notificatie.eventInitiatorNaam,
      content: notificatie.notificatieTekst,
    };
  }
}
