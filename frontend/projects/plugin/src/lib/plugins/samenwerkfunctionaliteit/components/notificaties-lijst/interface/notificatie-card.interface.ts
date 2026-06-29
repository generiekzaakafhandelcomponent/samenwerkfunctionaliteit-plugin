import {InputSignal} from "@angular/core";

export interface NotificatieCardInput {
  notificatieId: string;
  type: NotificatieType;
  colorCode: string;
  title: string;
  eventDateTime: Date;
  initiatorNaam: string;
  content: string;
}

export interface NotificatieCard {
  inputs: InputSignal<NotificatieCardInput>;
}

export enum NotificatieType {
  STATUS,
  DOCUMENT,
  SYSTEEM,
  BERICHT,
}



