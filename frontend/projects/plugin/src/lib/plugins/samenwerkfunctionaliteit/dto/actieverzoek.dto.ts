import { Links } from './links.dto';
import { Documenten } from './document.dto';
import { Actieverzoek } from '../models/actieverzoek.model';

export interface ActieverzoekResponse {
  _links: Links;
  aantalBerichten: number;
  actieverzoekId: string;
  creatieDatumTijd: string;
  documenten: Documenten;
  laatstAangepastDatumTijd: string;
  laatstAangepastDoor: string;
  laatstAangepastDoorNaam: string;
  melding: string;
  omschrijving: string;
  ontvanger: string;
  ontvangerNaam: string;
  productId: string;
  samenwerkingId: string;
  status: ActieverzoekStatus;
  titel: string;
  zender: string;
  zenderNaam: string;
}

enum ActieverzoekStatus {
  OPEN = 'OPEN',
  IN_BEHANDELING = 'IN_BEHANDELING',
  GEWEIGERD = 'GEWEIGERD',
  INGETROKKEN = 'INGETROKKEN',
  GEREEDGEMELD = 'GEREEDGEMELD',
  GEREED = 'GEREED',
}

export function mapActieverzoekResponseToActieverzoek(
  actieverzoekResponse: ActieverzoekResponse,
): Actieverzoek {
  return {
    title: actieverzoekResponse.titel,
    actieverzoekId: actieverzoekResponse.actieverzoekId,
    receiver: actieverzoekResponse.ontvanger,
    receiverName: actieverzoekResponse.ontvangerNaam,
    createdOn: new Date(actieverzoekResponse.creatieDatumTijd),
    sender: actieverzoekResponse.zender,
    senderName: actieverzoekResponse.zenderNaam,
  };
}
