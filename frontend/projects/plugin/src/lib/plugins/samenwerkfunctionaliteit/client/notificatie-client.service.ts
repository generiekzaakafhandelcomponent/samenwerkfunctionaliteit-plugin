import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificatieClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly NOTIFICATIES_URL = "samenwerkfunctionaliteit/v5/notificaties"

  getNotificaties() {
    return this.http.get(`/${this.NOTIFICATIES_URL}`)
  }
}
