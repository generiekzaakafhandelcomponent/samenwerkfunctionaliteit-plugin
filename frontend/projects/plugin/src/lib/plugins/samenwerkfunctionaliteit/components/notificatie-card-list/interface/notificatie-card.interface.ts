import { InputSignal } from "@angular/core";
import { NotificatieCardInput } from "../model/notificatie-card-input.model";

export interface NotificatieCardInterface {
  inputs: InputSignal<NotificatieCardInput>;
}
