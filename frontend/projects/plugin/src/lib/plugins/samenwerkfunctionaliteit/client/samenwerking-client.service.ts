import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Samenwerking} from "../components/samenwerkingsinformatiepagina/model/samenwerking.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SamenwerkingClient {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:8080";
  private readonly SAMENWERKINGEN_URL = "samenwerkfunctionaliteit/v5/samenwerkingen"

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    const httpHeaders = new HttpHeaders({
      "x-dienst": "ggd-hl"
    })

    return this.http.get<Samenwerking>(`${this.baseUrl}/${this.SAMENWERKINGEN_URL}/${samenwerkingId}`, {headers: httpHeaders})
  }
}
