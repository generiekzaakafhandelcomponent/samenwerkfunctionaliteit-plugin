import {inject, Injectable} from "@angular/core";
import {NotificatieClient} from "../client/notificatie-client.service";
import {map, Observable} from "rxjs";
import {mapNotificatieResponseToModels, NotificatieResponse} from "../dto/notificatie.dto";
import {Notificatie} from "../models/notificatie.model"

@Injectable({
  providedIn: "root",
})
export class NotificatieService {
  notificatieClient = inject(NotificatieClient);

  getNotificaties(): Observable<Notificatie[]> {
    return this.notificatieClient.getNotificaties().pipe(
      map((response: NotificatieResponse) => {
        return mapNotificatieResponseToModels(response)
      })
    );
  }
}
