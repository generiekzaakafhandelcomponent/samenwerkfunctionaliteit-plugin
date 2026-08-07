import { Links } from './links.dto';
import {
  DocumentenResponse,
  mapDocumentenResponseToModel,
} from './document.dto';
import {
  Actieverzoek,
  ActieverzoekUpdateData,
} from '../models/actieverzoek.model';
import {
  ActieverzoekStatusType,
  ActieverzoekStatusTypes,
} from '../types/actieverzoek-status.type';

export interface ActieverzoekResponse {
  _links: Links;
  aantalBerichten: number;
  actieverzoekId: string;
  creatieDatumTijd: string;
  documenten: DocumentenResponse[];
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

export interface UpdateActieverzoekRequest {
  melding: string;
  omschrijving: string;
  productId: string;
  status: ActieverzoekStatus;
  titel: string;
}

export enum ActieverzoekStatus {
  OPEN = 'OPEN',
  IN_BEHANDELING = 'IN_BEHANDELING',
  GEWEIGERD = 'GEWEIGERD',
  INGETROKKEN = 'INGETROKKEN',
  GEREEDGEMELD = 'GEREEDGEMELD',
  GEREED = 'GEREED',
}

function mapActieverzoekStatusToActieverzoekStatusType(
  actieverzoekStatus: ActieverzoekStatus,
): ActieverzoekStatusType {
  switch (actieverzoekStatus) {
    case ActieverzoekStatus.OPEN:
      return ActieverzoekStatusTypes.OPEN;
    case ActieverzoekStatus.IN_BEHANDELING:
      return ActieverzoekStatusTypes.IN_PROGRESS;
    case ActieverzoekStatus.GEWEIGERD:
      return ActieverzoekStatusTypes.REJECTED;
    case ActieverzoekStatus.INGETROKKEN:
      return ActieverzoekStatusTypes.WITHDRAWN;
    case ActieverzoekStatus.GEREEDGEMELD:
      return ActieverzoekStatusTypes.REPORTED_READY;
    case ActieverzoekStatus.GEREED:
      return ActieverzoekStatusTypes.READY;
    default:
      throw new Error(`Invalid ActieverzoekStatus: ${actieverzoekStatus}`);
  }
}

function mapActieverzoekStatusTypeToActieverzoekStatus(
  actieverzoekStatusType: ActieverzoekStatusType,
): ActieverzoekStatus {
  switch (actieverzoekStatusType) {
    case ActieverzoekStatusTypes.OPEN:
      return ActieverzoekStatus.OPEN;
    case ActieverzoekStatusTypes.IN_PROGRESS:
      return ActieverzoekStatus.IN_BEHANDELING;
    case ActieverzoekStatusTypes.REJECTED:
      return ActieverzoekStatus.GEWEIGERD;
    case ActieverzoekStatusTypes.WITHDRAWN:
      return ActieverzoekStatus.INGETROKKEN;
    case ActieverzoekStatusTypes.REPORTED_READY:
      return ActieverzoekStatus.GEREEDGEMELD;
    case ActieverzoekStatusTypes.READY:
      return ActieverzoekStatus.GEREED;
    default:
      throw new Error(
        `Invalid ActieverzoekStatusType: ${actieverzoekStatusType}`,
      );
  }
}

export function mapActieverzoekResponseToActieverzoek(
  actieverzoekResponse: ActieverzoekResponse,
): Actieverzoek {
  return {
    amountOfMessages: actieverzoekResponse.aantalBerichten,
    description: actieverzoekResponse.omschrijving,
    documents: (actieverzoekResponse.documenten ?? []).map(
      mapDocumentenResponseToModel,
    ),
    lastChangedBy: actieverzoekResponse.laatstAangepastDoor,
    lastChangedByName: actieverzoekResponse.laatstAangepastDoorNaam,
    lastChangedDateTime: actieverzoekResponse.laatstAangepastDatumTijd,
    links: actieverzoekResponse._links,
    notice: actieverzoekResponse.melding,
    productId: actieverzoekResponse.productId,
    samenwerkingId: actieverzoekResponse.samenwerkingId,
    status: mapActieverzoekStatusToActieverzoekStatusType(
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

export function createUpdateActieverzoekRequestFrom(
  actieverzoekUpdateData: ActieverzoekUpdateData,
): UpdateActieverzoekRequest {
  return {
    melding: actieverzoekUpdateData.notice,
    omschrijving: actieverzoekUpdateData.description,
    productId: actieverzoekUpdateData.productId,
    status: mapActieverzoekStatusTypeToActieverzoekStatus(
      actieverzoekUpdateData.status,
    ),
    titel: actieverzoekUpdateData.title,
  };
}
