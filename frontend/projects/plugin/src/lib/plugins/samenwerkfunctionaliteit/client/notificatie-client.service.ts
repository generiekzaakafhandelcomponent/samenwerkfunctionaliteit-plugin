import { NOTIFICATIES_URL } from '../config/swf-plugin-config';

@Injectable({
  providedIn: 'root'
})
export class NotificatieClient {
  private readonly http: HttpClient = inject(HttpClient);

  getNotificaties(): Observable<NotificatieResponse> {
    return this.http.get<NotificatieResponse>(`/${NOTIFICATIES_URL}`);
  }
}
