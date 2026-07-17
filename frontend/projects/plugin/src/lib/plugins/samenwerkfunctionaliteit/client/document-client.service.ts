import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DocumentenOverzichtResponse } from "../dto/document.dto";

@Injectable({
  providedIn: "root",
})
export class DocumentClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly DOCUMENTEN_URL = "documenten";

  getDocumenten(samenwerkingId: string): Observable<DocumentenOverzichtResponse> {
    return this.http.get<DocumentenOverzichtResponse>(
      `samenwerkfunctionaliteit/v5/samenwerkingen/${samenwerkingId}/${this.DOCUMENTEN_URL}`,
    );
  }
}
