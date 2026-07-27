import { Document } from './document.model';
import { Links } from './links.model';

export interface Actieverzoek {
  links: Links;
  title: string;
  amountOfMessages: number;
  actieverzoekId: string;
  createdOn: Date;
  documents: Document[];
  lastChangedDateTime: string;
  lastChangedBy: string;
  lastChangedByName: string;
  notice: string;
  description: string;
  receiver: string;
  receiverName: string;
  productId: string;
  samenwerkingId: string;
  status: ActieverzoekStatus;
  sender: string;
  senderName: string;
}

export type ActieverzoekStatus =
  | 'OPEN'
  | 'IN_BEHANDELING'
  | 'GEWEIGERD'
  | 'INGETROKKEN'
  | 'GEREEDGEMELD'
  | 'GEREED';
