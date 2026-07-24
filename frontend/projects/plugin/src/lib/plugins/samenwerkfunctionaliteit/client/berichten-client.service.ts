import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostBerichtRequestDto } from '../dto/post-bericht-request.dto';
import { PostBerichtResponseDto } from '../dto/post-bericht-response.dto';
import { Observable } from 'rxjs';
import { ACTIEVERZOEKEN_URL } from '../config/samenwerking-config';
import { BerichtenOverzichtResponse } from '../dto/berichten.dto';

@Injectable({
  providedIn: 'root',
})
export class BerichtenClient {
  private readonly http: HttpClient = inject(HttpClient);

  postBericht(
    actieverzoekId: string,
    bericht: PostBerichtRequestDto,
  ): Observable<PostBerichtResponseDto> {
    return this.http.post<PostBerichtResponseDto>(
      `/${ACTIEVERZOEKEN_URL}/${actieverzoekId}/berichten`,
      bericht,
    );
  }

  getBerichten(actieverzoekId: string): Observable<BerichtenOverzichtResponse> {
    return this.http.get<BerichtenOverzichtResponse>(
      `/${ACTIEVERZOEKEN_URL}/${actieverzoekId}/berichten`,
    );
  }
}
