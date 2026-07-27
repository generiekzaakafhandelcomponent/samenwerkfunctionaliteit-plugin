import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActieverzoekResponse } from '../dto/actieverzoek.dto';
import { ACTIEVERZOEKEN_URL } from '../config/samenwerking-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActieverzoekClient {
  private readonly http: HttpClient = inject(HttpClient);

  getActieverzoek(actieverzoekId: string): Observable<ActieverzoekResponse> {
    return this.http.get<ActieverzoekResponse>(
      `${ACTIEVERZOEKEN_URL}/${actieverzoekId}`,
    );
  }
}
