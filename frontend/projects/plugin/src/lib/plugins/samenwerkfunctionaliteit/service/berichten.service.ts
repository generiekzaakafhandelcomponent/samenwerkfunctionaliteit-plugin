import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BerichtenClient } from '../client/berichten-client.service';
import { PostBerichtRequestDto } from '../dto/post-bericht-request.dto';
import {
  mapBerichtenOverzichtResponseToBerichten,
  mapPostBerichtResponseDtoToBericht,
} from '../mapper/bericht.mapper';
import { Bericht } from '../models/bericht.model';
import { BerichtenOverzichtResponse } from '../dto/berichten.dto';

@Injectable({ providedIn: 'root' })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(actieverzoekId: string, bericht: string): Observable<Bericht> {
    const berichtBody: PostBerichtRequestDto = {
      bericht: bericht.trim(),
    };
    return this.berichtenClient
      .postBericht(actieverzoekId, berichtBody)
      .pipe(map((response) => mapPostBerichtResponseDtoToBericht(response)));
  }

  getBerichten(actieverzoekId: string): Observable<Bericht[]> {
    return this.berichtenClient.getBerichten(actieverzoekId).pipe(
      map((berichtenOverzichtResponse: BerichtenOverzichtResponse) => {
        return mapBerichtenOverzichtResponseToBerichten(
          berichtenOverzichtResponse,
        );
      }),
      catchError((error: Error) => {
        return throwError(() => error);
      }),
    );
  }
}
