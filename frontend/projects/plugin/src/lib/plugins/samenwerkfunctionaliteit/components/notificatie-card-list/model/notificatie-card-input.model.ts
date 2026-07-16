import { CardInput } from "../interface/card-input.interface";
import { NotificatieCardType } from "../type/notificatie-card.type";

export class NotificatieCardInput implements CardInput {
  constructor(
    public readonly notificatieId = "",
    public readonly type: NotificatieCardType | null = null,
    public readonly title = "",
    public readonly eventDateTime: Date | null = null,
    public readonly initiatorNaam = "",
    public readonly content = "",
  ) {}
}
