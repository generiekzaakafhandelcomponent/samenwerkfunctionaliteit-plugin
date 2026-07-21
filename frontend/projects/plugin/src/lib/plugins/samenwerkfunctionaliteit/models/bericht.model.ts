import { Links } from './links.model';

export interface Bericht {
  _links?: Links;
  actieverzoekId: string;
  berichtId: string;
  creatieDatumTijd: string;
  inhoud: string;
  ontvanger: string;
  ontvangerNaam?: string;
  samenwerkingId?: string;
  zender?: string;
  zenderNaam?: string;
}

export interface ChatBericht {
  messageId: string;
  createdOn: Date;
  content: string;
  receiver: string;
  receiverName: string;
  samenwerkingId: string;
  sender: string;
}
