import { SamenwerkingProperties } from '../models/samenwerking-properties.model';
import { OpenZaakProperties } from '../models/open-zaak-properties.model';

export interface SamenwerkfunctionaliteitDocument {
  samenwerkingProperties: SamenwerkingProperties;
  openzaak: OpenZaakProperties;
}
