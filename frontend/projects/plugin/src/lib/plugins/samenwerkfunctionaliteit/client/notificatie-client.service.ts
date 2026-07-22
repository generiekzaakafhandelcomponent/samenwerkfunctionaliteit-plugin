import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificatieResponse} from "../dto/notificatie.dto";

@Injectable({
  providedIn: 'root'
})
export class NotificatieClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly NOTIFICATIES_URL = "samenwerkfunctionaliteit/v5/notificaties"

  getNotificaties(): Observable<NotificatieResponse> {
    return this.http.get<NotificatieResponse>(`/${this.NOTIFICATIES_URL}`)
  }
}
