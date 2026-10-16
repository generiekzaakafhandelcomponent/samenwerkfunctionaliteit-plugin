import { ActieverzoekId } from '../types/actieverzoek-id.type';
import { OpenZaakId } from '../types/open-zaak-id.type';
import { SamenwerkingId } from '../types/samenwerking-id.type';
import { Samenwerking } from '../models/samenwerking.model';
import { Actieverzoek } from '../models/actieverzoek.model';
import { Notificatie } from '../models/notificatie.model';
import { Bericht } from '../models/bericht.model';

export interface SwfCaseProperties {
  samenwerkingId: SamenwerkingId;
  actieverzoekId: ActieverzoekId;
  openZaakId: OpenZaakId;
  isSwfCase: boolean;
  archiveringskopie?: SwfArchiveCopy;
}

export interface SwfArchiveCopy {
  dateTime: Date;
  samenwerking: Samenwerking;
  actieverzoek: Actieverzoek;
  notificaties: Notificatie[];
  berichten: Bericht[];
}
