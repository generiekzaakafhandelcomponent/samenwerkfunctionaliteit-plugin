import {Component} from '@angular/core';
import {NotificatieComponent} from "../../components/notificaties-lijst/notificatie/notificatie.component";
import {NotificatieCardInput, NotificatieType} from "../../components/notificaties-lijst/interface/notificatie-card.interface";

@Component({
  templateUrl: `notificaties-custom-tab.component.html`,
  imports: [NotificatieComponent],
  selector: "notificaties-custom-tab",
})
export class NotificatiesCustomTabComponent {

  inputs: NotificatieCardInput = {
    notificatieId: "eb53b7c5-ea64-4c49-94db-67aa7cac8e05",
    type: NotificatieType.BERICHT,
    colorCode: "BLUE",
    title: "Actieverzoek ontvangen",
    eventDateTime: new Date(),
    initiatorNaam: "Omgevingsdienst Rommelerwaard",
    content: "Omgevingsdienst Rommelerwaard heeft u het\n" +
      "actieverzoek \"Adviesaanvraag bouwwerkzaamheden Berkendaal\"\n" +
      "gestuurd",
  }

  ngOnInit(){

  }
}
