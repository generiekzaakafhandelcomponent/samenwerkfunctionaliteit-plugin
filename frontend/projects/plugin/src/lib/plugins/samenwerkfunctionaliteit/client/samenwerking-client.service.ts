import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Samenwerking} from "../components/samenwerkingsinformatiepagina/dto/samenwerking.dto";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SamenwerkingClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly SAMENWERKINGEN_URL = "samenwerkfunctionaliteit/v1/samenwerkingen"

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.http.get<Samenwerking>(`/${this.SAMENWERKINGEN_URL}/${samenwerkingId}`)
  }
}
