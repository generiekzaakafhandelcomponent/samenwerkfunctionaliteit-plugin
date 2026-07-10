import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PostBerichtRequestDto } from "../dto/post-bericht-request.dto";
import { PostBerichtResponseDto } from "../dto/post-bericht-response.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BerichtenClient {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly SAMENWERKINGEN_URL = "samenwerkfunctionaliteit/v5/samenwerkingen"

  postBericht(actieverzoekId: string, bericht: PostBerichtRequestDto): Observable<PostBerichtResponseDto> {
    return this.http.post<PostBerichtResponseDto>(`/${this.SAMENWERKINGEN_URL}/actieverzoeken/${actieverzoekId}/berichten`, bericht)
  }
}
