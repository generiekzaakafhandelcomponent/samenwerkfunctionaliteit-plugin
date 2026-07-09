import { inject, Injectable } from "@angular/core";
import { BerichtenClient } from "../client/berichten-client.service";
import { PostBerichtRequest } from "../dto/postBerichtRequest.dto";
import { Observable } from "rxjs";
import { PostBerichtResponse } from "../dto/postBerichtResponse.dto";

@Injectable({ providedIn: "root", })
export class BerichtenService {
  berichtenClient = inject(BerichtenClient);

  postBericht(actieverzoekId: string, bericht: string): Observable<PostBerichtResponse> {
    const berichtBody: PostBerichtRequest = {
      bericht: bericht.trim()
    }
    return this.berichtenClient.postBericht(actieverzoekId, berichtBody);
  }
}
