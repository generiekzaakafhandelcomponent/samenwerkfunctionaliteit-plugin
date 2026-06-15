import {inject, Injectable} from "@angular/core";
import {SamenwerkingsinformatiepaginaClient} from "../client/samenwerkingsinformatiepagina.client";
import {Observable} from "rxjs";
import {Samenwerking} from "../model/samenwerking.model";

@Injectable({
  providedIn: "root",
})
export class SamenwerkingsinformatiepaginaService {
  samenwerkingClient = inject(SamenwerkingsinformatiepaginaClient);

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingClient.getSamenwerking(samenwerkingId).pipe();
  }
}
