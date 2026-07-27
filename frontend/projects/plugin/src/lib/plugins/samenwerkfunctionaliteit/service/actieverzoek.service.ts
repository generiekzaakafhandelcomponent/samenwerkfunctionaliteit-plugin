import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Actieverzoek } from '../models/actieverzoek.model';
import { map } from 'rxjs/operators';
import {
  ActieverzoekResponse,
  mapActieverzoekResponseToActieverzoek,
} from '../dto/actieverzoek.dto';
import { ActieverzoekClient } from '../client/actieverzoek-client.service';
import { BusinessKey } from '../types/business-key.type';

@Injectable({
  providedIn: 'root',
})
export class ActieverzoekService {
  private readonly actieverzoekClient: ActieverzoekClient =
    inject(ActieverzoekClient);
  private actieverzoekCache: Map<BusinessKey, Actieverzoek> = new Map<
    BusinessKey,
    Actieverzoek
  >();

  getActieverzoek(
    actieverzoekId: string,
    valtimoBusinessKey: BusinessKey,
  ): Observable<Actieverzoek> {
    if (this.actieverzoekCache.get(valtimoBusinessKey)) {
      return of(this.actieverzoekCache.get(valtimoBusinessKey));
    }
    return this.actieverzoekClient.getActieverzoek(actieverzoekId).pipe(
      map((actieverzoekResponse: ActieverzoekResponse) => {
        return mapActieverzoekResponseToActieverzoek(actieverzoekResponse);
      }),
      tap((actieverzoek: Actieverzoek) => {
        this.actieverzoekCache.set(valtimoBusinessKey, actieverzoek);
      }),
    );
  }
}
