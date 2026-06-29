import {InputSignal} from "@angular/core";

export interface NotificatieCardInput {
  notificatieId: string;
  type: NotificatieCardType;
  colorCode: string;
  title: string;
  eventDateTime: Date;
  initiatorNaam: string;
  content: string;
}

export interface NotificatieCard {
  inputs: InputSignal<NotificatieCardInput>;
}

export enum NotificatieCardType {
  STATUS = "STATUS",
  DOCUMENT = "DOCUMENT",
  SYSTEEM = "SYSTEEM",
  BERICHT = "BERICHT",
}

export enum NotificatieType {
  DOCUMENT_TOEGEVOEGD = "DOCUMENT_TOEGEVOEGD",
  STATUS_ACTIEVERZOEK_GEWIJZIGD = "STATUS_GEWIJZIGD",
  // SYSTEEMMELDING = "SYSTEEMMELDING",
  DOCUMENT_GEWIJZIGD = "DOCUMENT_GEWIJZIGD",
  UITNODIGING_KETENPARTNER = "UITNODIGING_KETENPARTNER",
  DOCUMENT_VERWIJDERD = "DOCUMENT_VERWIJDERD",
  VERZOEK_OPHALEN_GESLAAGD = "VERZOEK_OPHALEN_GESLAAGD",
  NIEUW_BERICHT = "NIEUW_BERICHT",
}



