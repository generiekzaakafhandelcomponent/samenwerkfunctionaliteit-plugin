import { ConfidentialityType } from '../types/confidentiality.type';

export interface UploadDocumentQueryParams {
  documentDescription?: string;
  numberWithinSystem?: string;
  systemId?: string;
  confidentialityType?: ConfidentialityType;
  language?: string;
}
