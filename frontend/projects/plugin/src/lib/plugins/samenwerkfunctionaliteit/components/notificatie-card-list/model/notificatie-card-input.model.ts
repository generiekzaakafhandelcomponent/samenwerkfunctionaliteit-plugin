import { CardInput } from "../interface/card-input.interface";
import { NotificatieCardType, NotificatieCardTypes } from "../type/notificatie-card.type";

export class NotificatieCardInput implements CardInput {
  constructor(
    public notificatieId = "",
    public type: NotificatieCardType | null = null,
    public title = "",
    public eventDateTime: Date | null = null,
    public initiatorNaam = "",
    public content = "",
  ) {}
}
