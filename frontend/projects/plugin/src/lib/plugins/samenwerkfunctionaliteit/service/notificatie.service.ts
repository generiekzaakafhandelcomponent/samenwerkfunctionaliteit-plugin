import { inject, Injectable } from "@angular/core";
import { NotificatieClient } from "../client/notificatie-client.service";
import { map, Observable } from "rxjs";
import { mapDtosToModels, NotificatieResponse } from "../dto/notificatie.dto";
import { Notificatie } from "../models/notificatie.model";

@Injectable({
  providedIn: "root",
})
export class NotificatieService {
  notificatieClient = inject(NotificatieClient);

  getNotificaties(samenwerkingId: string): Observable<Notificatie[]> {
    return this.notificatieClient.getNotificaties().pipe(
      map((response: NotificatieResponse) => {
        return mapDtosToModels(response);
      }),
      map((notificaties: Notificatie[]) => {
        return notificaties.filter((notificatie) => {
          return notificatie.samenwerkingId === samenwerkingId;
        });
      }),
    );
  }
}
