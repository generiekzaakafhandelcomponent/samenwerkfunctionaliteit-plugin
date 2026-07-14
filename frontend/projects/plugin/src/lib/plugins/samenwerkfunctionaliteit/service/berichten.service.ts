import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BerichtenClient } from "../client/berichten-client.service";
import { PostBerichtRequestDto } from "../dto/post-bericht-request.dto";
import { PostBerichtResponseDto } from "../dto/post-bericht-response.dto";
import { Bericht } from "../models/bericht.model";

@Injectable({ providedIn: "root" })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(actieverzoekId: string, bericht: string): Observable<Bericht> {
    const berichtBody: PostBerichtRequestDto = {
      bericht: bericht.trim(),
    };
    return this.berichtenClient.postBericht(actieverzoekId, berichtBody).pipe(map((response) => this.mapPostBerichtResponse(response)));
  }

  private mapPostBerichtResponse(response: PostBerichtResponseDto): Bericht {
    return {
      _links: response._links,
      actieverzoekId: response.actieverzoekId,
      berichtId: response.berichtId,
      creatieDatumTijd: response.creatieDatumTijd,
      inhoud: response.inhoud,
      ontvanger: response.ontvanger,
      ontvangerNaam: response.ontvangerNaam,
      samenwerkingId: response.samenwerkingId,
      zender: response.zender,
      zenderNaam: response.zenderNaam,
    };
  }
}
