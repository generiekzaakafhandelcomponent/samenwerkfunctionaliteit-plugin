import {Links} from "./links.dto";
import {Page} from "./page.dto";
import {NotificatieType} from "../components/notificaties-lijst/interface/notificatie-card.interface";
import {Notificatie as NotificatieModel} from '../models/notificatie.model';

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

function mapNotificatieToModel(notificatie: Notificatie): NotificatieModel {
  return {
    notificatieId: notificatie.notificatieId,
    notificatieType: notificatie.notificatieType,
    samenwerkingId: notificatie.samenwerkingId,
    samenwerkVorm: notificatie.samenwerkVorm,
    notificatieTitel: notificatie.notificatieTitel,
    notificatieTekst: notificatie.notificatieTekst,
    eventInitiator: notificatie.eventInitiator,
    eventInitiatorNaam: notificatie.eventInitiatorNaam,
    deelnemer: notificatie.deelnemer,
    deelnemerNaam: notificatie.deelnemerNaam,
    eventDatumTijd: notificatie.eventDatumTijd,
    properties: notificatie.properties,
    _links: notificatie._links,
  }
}

export function mapNotificatieResponseToModels(response: NotificatieResponse): NotificatieModel[] {
  return response._embedded.notificaties.map(mapNotificatieToModel);
}
