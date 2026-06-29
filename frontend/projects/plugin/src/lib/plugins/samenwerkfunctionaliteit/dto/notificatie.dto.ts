import {Links} from "./links.dto";
import {Page} from "./page.dto";
import {NotificatieType} from "../components/notificaties-lijst/interface/notificatie-card.interface";

export interface NotificatieResponse {
  page: Page
  _embedded: {
    notificaties: Notificatie[]
  };
  _links: Links;
}

export interface Notificatie {
  notificatieId: string,
  notificatieType: NotificatieType,
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
