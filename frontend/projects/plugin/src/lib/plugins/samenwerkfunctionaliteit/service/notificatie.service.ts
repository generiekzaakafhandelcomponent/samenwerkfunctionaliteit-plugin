import {inject, Injectable} from "@angular/core";
import {NotificatieClient} from "../client/notificatie-client.service";

@Injectable({
  providedIn: "root",
})
export class NotificatieService {
  notificatieClient = inject(NotificatieClient);

  getSamenwerking() {
    return this.notificatieClient.getNotificaties();
  }
}
