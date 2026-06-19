import {inject, Injectable} from "@angular/core";
import {SamenwerkingClient} from "../client/samenwerking-client.service";
import {Observable} from "rxjs";
import {Samenwerking} from "../components/samenwerkingsinformatiepagina/model/samenwerking.model";

@Injectable({
  providedIn: "root",
})
export class SamenwerkingService {
  samenwerkingClient = inject(SamenwerkingClient);

  getSamenwerking(samenwerkingId: string): Observable<Samenwerking> {
    return this.samenwerkingClient.getSamenwerking(samenwerkingId).pipe();
  }
}
