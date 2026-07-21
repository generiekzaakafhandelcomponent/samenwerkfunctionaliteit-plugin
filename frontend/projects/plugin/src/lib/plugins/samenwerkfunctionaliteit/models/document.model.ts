import { DocumentInterface } from "../interface/document.interface";
import { ConfidentialityType } from "../type/confidentiality.type";

export class Document implements DocumentInterface {
  constructor(
    readonly samenwerkingId: string,
    readonly documentId: string,
    readonly fileName: string,
    readonly confidentialityLevel: ConfidentialityType,
    readonly creationDate: string,
  ) {}
}
