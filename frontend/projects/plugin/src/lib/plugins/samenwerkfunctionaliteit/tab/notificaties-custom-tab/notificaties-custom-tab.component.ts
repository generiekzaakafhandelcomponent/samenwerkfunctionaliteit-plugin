import {Component, inject, signal, WritableSignal} from '@angular/core';
import {NotificatieComponent} from "../../components/notificaties-lijst/notificatie/notificatie.component";
import {NotificatieCardInput, NotificatieCardType} from "../../components/notificaties-lijst/interface/notificatie-card.interface";
import {NotificatieService} from "../../service/notificatie.service";
import {take} from "rxjs";
import {Notificatie} from "../../models/notificatie.model";
import {getNotificationCardTypeByNotificationType} from "../../components/notificaties-lijst/config/notificatie-type-config";
import {LoadingModule} from "carbon-components-angular";
import {NgClass} from "@angular/common";

@Component({
  templateUrl: `notificaties-custom-tab.component.html`,
  imports: [NotificatieComponent, LoadingModule, NgClass],
  selector: "notificaties-custom-tab",
})
export class NotificatiesCustomTabComponent {
  notificatieService: NotificatieService = inject(NotificatieService);
  notifications: WritableSignal<Notificatie[]> = signal<Notificatie[]>([]);
  inputs: WritableSignal<NotificatieCardInput[]> = signal<NotificatieCardInput[]>([]);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificatieService.getNotificaties("SAM-66497")
      .pipe(take(1))
      .subscribe(notificaties => {
        this.notifications.set(notificaties)
        this.loadInputs(this.notifications());
      })
  }

  loadInputs(notificaties: Notificatie[]) {
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
      colorCode: this.getColorCodeForType(type),
      title: notificatie.notificatieTitel,
      eventDateTime: eventDateTime,
      initiatorNaam: notificatie.eventInitiatorNaam,
      content: notificatie.notificatieTekst,
    };
  }

  private getColorCodeForType(type: NotificatieCardType): string {
    const colorMap: Record<NotificatieCardType, string> = {
      STATUS: "#1976d2",
      DOCUMENT: "#9c27b0",
      SYSTEEM: "#388e3c",
      BERICHT: "#ff9800",
    };
    return colorMap[type];
  }
}
