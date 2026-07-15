import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly DOCUMENTEN_URL = "samenwerkingen/{{samenwerkingId}}/documenten";

  getDocumenten(): Observable<DocumentenResponse> {
    return this.http.get<DocumentenResponse>(`/${this.DOCUMENTEN_URL}`);
  }
}
