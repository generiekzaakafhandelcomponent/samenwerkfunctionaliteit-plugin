import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Samenwerking } from '../dto/samenwerking.dto';
import { Observable } from 'rxjs';
import {
  ACTIEVERZOEKEN_URL,
  SAMENWERKINGEN_URL,
} from '../config/samenwerking-config';
import { ActieverzoekResponse } from '../dto/actieverzoek.dto';

@Injectable({
  providedIn: 'root',
})
export class SamenwerkingClient {
  private readonly http: HttpClient = inject(HttpClient);

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.http.get<Samenwerking>(
      `/${SAMENWERKINGEN_URL}/${samenwerkingId}`,
    );
  }

  getActieverzoek(actieverzoekId: string): Observable<ActieverzoekResponse> {
    return this.http.get<ActieverzoekResponse>(
      `${ACTIEVERZOEKEN_URL}/${actieverzoekId}`,
    );
  }
}
