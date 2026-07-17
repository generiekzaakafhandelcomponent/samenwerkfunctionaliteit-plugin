import { InputSignal } from "@angular/core";
import { CardInput } from "./card-input.interface";

export interface NotificatieCardInterface {
  inputs: InputSignal<CardInput>;
}
