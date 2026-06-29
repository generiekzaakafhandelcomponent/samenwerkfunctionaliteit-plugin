import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PostBerichtRequest } from "../dto/postBerichtRequest.dto";
import { PostBerichtResponse } from "../dto/postBerichtResponse.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BerichtenClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly SAMENWERKINGEN_URL = "samenwerkfunctionaliteit/v5/samenwerkingen"

  postBericht(actieverzoekId: string, bericht: PostBerichtRequest): Observable<PostBerichtResponse> {
    return this.http.post<PostBerichtResponse>(`/${this.SAMENWERKINGEN_URL}/actieverzoeken/${actieverzoekId}/berichten`, bericht)
  }
}
