import {Links} from "./links.model";

export interface PostBerichtResponse {
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
