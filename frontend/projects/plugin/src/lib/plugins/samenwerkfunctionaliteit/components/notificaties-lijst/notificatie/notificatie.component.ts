import {NotificatieCard, NotificatieCardInput, NotificatieType} from '../interface/notificatie-card.interface'
import {Component, input} from "@angular/core";



@Component({
  templateUrl: `notificaties.component.html`,
  selector: "swf-notificatie",
})
export class NotificatieComponent implements NotificatieCard {
  inputs = input<NotificatieCardInput>({
    notificatieId: "",
    colorCode: "",
    content: "",
    eventDateTime: new Date(),
    initiatorNaam: "",
    title: "",
    type: NotificatieType.STATUS
  });
}
