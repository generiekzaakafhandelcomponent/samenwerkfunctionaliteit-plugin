import {inject, Injectable} from "@angular/core";
import {SamenwerkingsinformatiepaginaClient} from "../client/samenwerkingsinformatiepagina.client";


@Injectable({
  providedIn: "root",
})
export class SamenwerkingsinformatiepaginaService {
  samenwerkingClient = inject(SamenwerkingsinformatiepaginaClient);

  getSamenwerking(samenwerkingId: string) {
    return this.samenwerkingClient.getSamenwerking(samenwerkingId).pipe();
  }
}
