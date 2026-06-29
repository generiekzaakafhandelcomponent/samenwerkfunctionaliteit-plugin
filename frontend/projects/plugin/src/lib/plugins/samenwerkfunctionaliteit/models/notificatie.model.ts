import {Links} from "./links.model";

export interface Notificatie {
  notificatieId: string,
  notificatieType: string,
  samenwerkingId: string,
  samenwerkVorm: string,
  notificatieTitel: string,
  notificatieTekst: string,
  eventInitiator: string,
  eventInitiatorNaam: string,
  deelnemer: string,
  deelnemerNaam: string,
  eventDatumTijd: string,
  properties: Map<string, string>,
  _links: Links,
}
