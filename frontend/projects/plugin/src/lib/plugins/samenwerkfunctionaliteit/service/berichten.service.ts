import { inject, Injectable } from "@angular/core";
import { BerichtenClient } from "../client/berichten-client.service";
import { PostBerichtRequest } from "../dto/postBerichtRequest.dto";

@Injectable({ providedIn: "root", })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(actieverzoekId: string, bericht: string) {
    const berichtBody: PostBerichtRequest = {
      bericht: bericht
    }
    return this.berichtenClient.postBericht(actieverzoekId, berichtBody);
  }
}
