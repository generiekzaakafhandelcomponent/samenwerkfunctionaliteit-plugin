import { Links } from './links.dto';
import { Documenten, mapDocumentenResponseToModel } from './document.dto';
import {
  Actieverzoek,
  ActieverzoekStatus as ActieverzoekStatusModel,
} from '../models/actieverzoek.model';

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

export enum ActieverzoekStatus {
  OPEN = 'OPEN',
  IN_BEHANDELING = 'IN_BEHANDELING',
  GEWEIGERD = 'GEWEIGERD',
  INGETROKKEN = 'INGETROKKEN',
  GEREEDGEMELD = 'GEREEDGEMELD',
  GEREED = 'GEREED',
}

function mapActieverzoekStatusToActieverzoekStatusModel(
  actieverzoekStatus: ActieverzoekStatus,
): ActieverzoekStatusModel {
  if (actieverzoekStatus as ActieverzoekStatusModel) {
    return actieverzoekStatus as ActieverzoekStatusModel;
  }

  throw new Error(`Invalid ActieverzoekStatus value: ${actieverzoekStatus}`);
}

export function mapActieverzoekResponseToActieverzoek(
  actieverzoekResponse: ActieverzoekResponse,
): Actieverzoek {
  return {
    amountOfMessages: actieverzoekResponse.aantalBerichten,
    description: actieverzoekResponse.omschrijving,
    documents: (actieverzoekResponse.documenten.documenten ?? []).map(
      mapDocumentenResponseToModel,
    ),
    lastChangedBy: actieverzoekResponse.laatstAangepastDoor,
    lastChangedByName: actieverzoekResponse.laatstAangepastDoorNaam,
    lastChangedDateTime: actieverzoekResponse.laatstAangepastDatumTijd,
    links: actieverzoekResponse._links,
    notice: actieverzoekResponse.melding,
    productId: actieverzoekResponse.productId,
    samenwerkingId: actieverzoekResponse.samenwerkingId,
    status: mapActieverzoekStatusToActieverzoekStatusModel(
      actieverzoekResponse.status,
    ),
    title: actieverzoekResponse.titel,
    actieverzoekId: actieverzoekResponse.actieverzoekId,
    receiver: actieverzoekResponse.ontvanger,
    receiverName: actieverzoekResponse.ontvangerNaam,
    createdOn: new Date(actieverzoekResponse.creatieDatumTijd),
    sender: actieverzoekResponse.zender,
    senderName: actieverzoekResponse.zenderNaam,
  };
}
