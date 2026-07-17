import { inject, Injectable } from "@angular/core";
import { DocumentClient } from "../client/document-client.service";
import { map, Observable } from "rxjs";
import { DocumentInterface } from "../interface/document.interface";
import { Documenten, DocumentenOverzichtResponse, mapDocumentenResponseToModels } from "../dto/document.dto";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  private readonly documentClient: DocumentClient = inject(DocumentClient);

  getDocumenten(samenwerkingId: string): Observable<DocumentInterface[]> {
    return this.documentClient.getDocumenten(samenwerkingId).pipe(
      map((documentenOverzichtResponse: DocumentenOverzichtResponse) => {
        return documentenOverzichtResponse._embedded;
      }),
      map((documenten: Documenten) => {
        return mapDocumentenResponseToModels(documenten);
      }),
      map((documenten: DocumentInterface[]) => {
        return documenten.filter((document) => {
          return document.samenwerkingId === samenwerkingId;
        });
      }),
    );
  }
}
