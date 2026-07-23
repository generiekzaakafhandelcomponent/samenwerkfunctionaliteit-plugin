import { ConfidentialityType } from '../types/confidentiality.type';

export interface DocumentInterface {
  samenwerkingId: string;
  documentId: string;
  fileName: string;
  confidentialityLevel: ConfidentialityType;
  creationDate: string;
}
