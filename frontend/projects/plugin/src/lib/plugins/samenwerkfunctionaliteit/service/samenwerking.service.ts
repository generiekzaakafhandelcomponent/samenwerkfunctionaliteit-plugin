import { inject, Injectable } from '@angular/core';
import { SamenwerkingClient } from '../client/samenwerking-client.service';
import { Observable } from 'rxjs';
import { Samenwerking } from '../models/samenwerking.model';
import { Actieverzoek } from '../models/actieverzoek.model';
import {
  ActieverzoekResponse,
  mapActieverzoekResponseToActieverzoek,
} from '../dto/actieverzoek.dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SamenwerkingService {
  samenwerkingClient = inject(SamenwerkingClient);

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingClient.getSamenwerking(samenwerkingId).pipe();
  }

  getActieverzoek(actieverzoekId: string): Observable<Actieverzoek> {
    return this.samenwerkingClient.getActieverzoek(actieverzoekId).pipe(
      map((actieverzoekResponse: ActieverzoekResponse) => {
        return mapActieverzoekResponseToActieverzoek(actieverzoekResponse);
      }),
    );
  }
}
