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
import { ActieverzoekId } from '../types/actieverzoek-id.type';

@Injectable({ providedIn: 'root' })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(
    actieverzoekId: ActieverzoekId,
    bericht: string,
  ): Observable<Bericht> {
    const berichtBody: PostBerichtRequestDto = {
      bericht: bericht.trim(),
    };
    return this.berichtenClient
      .postBericht(actieverzoekId, berichtBody)
      .pipe(map(mapPostBerichtResponseDtoToBericht));
  }

  getMessages(actieverzoekId: ActieverzoekId): Observable<Message[]> {
    return this.berichtenClient
      .getBerichten(actieverzoekId)
      .pipe(map(mapBerichtenOverzichtResponseToMessages));
  }
}
