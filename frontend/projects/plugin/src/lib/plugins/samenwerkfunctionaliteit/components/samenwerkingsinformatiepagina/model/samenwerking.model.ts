import {Status} from "./status.model";
import {Links} from "./links.model";

export interface Samenwerking{
  _links: Links
  aangemaaktDoor: string
  aangemaaktDoorNaam: string
  aantalActieverzoeken: number
  aantalNotificaties: number
  beschrijving: string
  bronVerzoek: string
  contactpersoonEmailadres: string
  contactpersoonNaam: string
  contactpersoonTelefoonnummer: string
  creatieDatumTijd: string
  eindDatumTijd: string
  globaleLocatie: string
  kenmerkSysteem: string
  laatstAangepastDatumTijd: string
  laatstAangepastDoor: string
  laatstAangepastDoorNaam: string
  nummerBinnenSysteem: string
  oloVerzoeknummer: string
  samenwerkDoel: string
  samenwerkVorm: string
  samenwerkingId: string
  status: Status
  taal: string
  titel: string
  typeVerzoek: string
  verzoeknummer: string
}
