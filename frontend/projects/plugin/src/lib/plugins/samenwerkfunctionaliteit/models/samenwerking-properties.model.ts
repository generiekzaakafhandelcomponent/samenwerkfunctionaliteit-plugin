export interface SamenwerkingProperties {
  samenwerkingId: string;
  actieverzoekDetails: ActieverzoekDetails;
}

interface ActieverzoekDetails {
  actieverzoekId: string;
  deelnemer: string;
  eventDatumTijd: string;
  eventInitiator: string;
}
