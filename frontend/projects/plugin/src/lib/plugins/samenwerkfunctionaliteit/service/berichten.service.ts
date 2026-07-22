import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BerichtenClient } from "../client/berichten-client.service";
import { PostBerichtRequestDto } from "../dto/post-bericht-request.dto";
import { mapPostBerichtResponseDtoToBericht } from "../mapper/bericht.mapper";
import { Bericht } from "../models/bericht.model";

@Injectable({ providedIn: "root" })
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
}
