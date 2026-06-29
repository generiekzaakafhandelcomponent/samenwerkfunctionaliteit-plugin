import {NotificatieCardType, NotificatieType} from "../interface/notificatie-card.interface";

const typeMap: Record<string, NotificatieCardType> = {
  DOCUMENT_TOEGEVOEGD: NotificatieCardType.DOCUMENT,
  STATUS_ACTIEVERZOEK_GEWIJZIGD: NotificatieCardType.STATUS,
  SYSTEEMMELDING: NotificatieCardType.SYSTEEM,
  BERICHT: NotificatieCardType.BERICHT,
  DOCUMENT_GEWIJZIGD: NotificatieCardType.DOCUMENT,
  UITNODIGING_KETENPARTNER: NotificatieCardType.BERICHT,
  DOCUMENT_VERWIJDERD: NotificatieCardType.DOCUMENT,
  VERZOEK_OPHALEN_GESLAAGD: NotificatieCardType.STATUS,
  NIEUW_BERICHT: NotificatieCardType.BERICHT,
};

export function getNotificationCardTypeByNotificationType(notificationType: NotificatieType): NotificatieCardType {
  return typeMap[notificationType];
}
