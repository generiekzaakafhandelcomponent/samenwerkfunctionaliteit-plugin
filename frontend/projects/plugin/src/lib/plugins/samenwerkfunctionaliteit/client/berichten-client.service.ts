import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PostBerichtRequestDto } from "../dto/post-bericht-request.dto";
import { PostBerichtResponseDto } from "../dto/post-bericht-response.dto";
import { Observable } from "rxjs";
import { SAMENWERKINGEN_URL } from "../config/samenwerking-config";


@Injectable({
  providedIn: 'root'
})
export class BerichtenClient {
  private readonly http: HttpClient = inject(HttpClient);

  postBericht(actieverzoekId: string, bericht: PostBerichtRequestDto): Observable<PostBerichtResponseDto> {
    return this.http.post<PostBerichtResponseDto>(`/${SAMENWERKINGEN_URL}/actieverzoeken/${actieverzoekId}/berichten`, bericht)
  }
}
