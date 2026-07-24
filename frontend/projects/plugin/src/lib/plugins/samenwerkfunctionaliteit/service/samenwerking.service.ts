import { inject, Injectable } from '@angular/core';
import { SamenwerkingClient } from '../client/samenwerking-client.service';
import { Observable, of, tap } from 'rxjs';
import { Samenwerking } from '../models/samenwerking.model';
import { Actieverzoek } from '../models/actieverzoek.model';
import {
  ActieverzoekResponse,
  mapActieverzoekResponseToActieverzoek,
} from '../dto/actieverzoek.dto';
import { map } from 'rxjs/operators';
import { BusinessKey } from '../models/business-key.model';

@Injectable({
  providedIn: 'root',
})
export class SamenwerkingService {
  private readonly samenwerkingClient = inject(SamenwerkingClient);
  private actieverzoekCache: Map<string, Actieverzoek> = new Map<
    string,
    Actieverzoek
  >();

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingClient.getSamenwerking(samenwerkingId).pipe();
  }

  getActieverzoek(
    actieverzoekId: string,
    valtimoBusinessKey: BusinessKey,
  ): Observable<Actieverzoek> {
    if (this.actieverzoekCache.get(valtimoBusinessKey.value)) {
      return of(this.actieverzoekCache.get(valtimoBusinessKey.value));
    }
    return this.samenwerkingClient.getActieverzoek(actieverzoekId).pipe(
      map((actieverzoekResponse: ActieverzoekResponse) => {
        return mapActieverzoekResponseToActieverzoek(actieverzoekResponse);
      }),
      tap((actieverzoek: Actieverzoek) => {
        this.actieverzoekCache.set(valtimoBusinessKey.value, actieverzoek);
      }),
    );
  }
}
