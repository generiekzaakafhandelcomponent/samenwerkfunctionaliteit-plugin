import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BerichtenClient } from '../client/berichten.client';
import { PostBerichtRequestDto } from '../dto/post-bericht-request.dto';
import {
  mapBerichtenOverzichtResponseToBerichten,
  mapBerichtenOverzichtResponseToMessages,
  mapPostBerichtResponseDtoToBericht,
} from '../mapper/bericht.mapper';
import { Bericht, Message } from '../models/bericht.model';

@Injectable({ providedIn: 'root' })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(actieverzoekId: string, bericht: string): Observable<Bericht> {
    const berichtBody: PostBerichtRequestDto = {
      bericht: bericht.trim(),
    };
    return this.berichtenClient
      .postBericht(actieverzoekId, berichtBody)
      .pipe(map(mapPostBerichtResponseDtoToBericht));
  }

  getMessages(actieverzoekId: string): Observable<Message[]> {
    return this.berichtenClient
      .getBerichten(actieverzoekId)
      .pipe(map(mapBerichtenOverzichtResponseToMessages));
  }

  getBerichten(actieverzoekId: string): Observable<Bericht[]> {
    return this.berichtenClient
      .getBerichten(actieverzoekId)
      .pipe(map(mapBerichtenOverzichtResponseToBerichten));
  }
}
