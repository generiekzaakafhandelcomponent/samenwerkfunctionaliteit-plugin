import {NotificatieCard, NotificatieCardInput, NotificatieCardType} from '../interface/notificatie-card.interface'
import {Component, input} from "@angular/core";


@Component({
  templateUrl: `./notificatie.component.html`,
  styleUrls: ['./notificatie.component.scss'],
  selector: "swf-notificatie",
})
export class NotificatieComponent implements NotificatieCard {
  inputs = input<NotificatieCardInput>({
    notificatieId: "",
    content: "",
    eventDateTime: new Date(),
    initiatorNaam: "",
    title: "",
    type: NotificatieCardType.STATUS
  });

  getTypeClass(type: NotificatieCardType): string {
    return NotificatieCardType[type].toLowerCase();
  }
}
