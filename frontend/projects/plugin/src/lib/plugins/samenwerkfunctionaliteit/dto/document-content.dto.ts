import { OpenZaakProperties } from './open-zaak-properties.model';
import { SamenwerkingProperties } from './samenwerking-properties.dto';
import { Samenwerking } from '../models/samenwerking.model';
import { Actieverzoek } from '../models/actieverzoek.model';
import { Notificatie } from '../models/notificatie.model';
import { BerichtDto } from './berichten.dto';

export interface SamenwerkfunctionaliteitDocument {
  samenwerkingProperties: SamenwerkingProperties;
  isAutomaticallyGenerated: boolean;
  openzaak?: OpenZaakProperties;
  archiveringskopie: SwfArchiveCopy;
}

export interface SwfArchiveCopy {
  dateTime: Date;
  samenwerking: Samenwerking;
  actieverzoek: Actieverzoek;
  notificaties: Notificatie[];
  berichten: BerichtDto[];
}
