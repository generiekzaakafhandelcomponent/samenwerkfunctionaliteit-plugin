import { ConfidentialityType } from "../type/confidentiality.type";

export interface DocumentInterface {
  samenwerkingId: string;
  documentId: string;
  fileName: string;
  confidentialityLevel: ConfidentialityType;
  creationDate: string;
}
