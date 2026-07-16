import { NotificatieCardType } from "../type/notificatie-card.type";

export interface CardInput {
  notificatieId: string;
  type: NotificatieCardType | null;
  title: string;
  eventDateTime: Date | null;
  initiatorNaam: string;
  content: string;
}
