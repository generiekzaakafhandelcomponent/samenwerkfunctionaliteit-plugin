import { Component } from "@angular/core";
import { NotificatieCardList } from "../../components/notificatie-card-list/notificatie-card-list.component";

@Component({
  selector: "swf-notificaties-custom-tab",
  imports: [NotificatieCardList],
  templateUrl: "./notificaties-custom-tab.component.html",
  styleUrl: "./notificaties-custom-tab.component.scss",
  standalone: true,
})
export class NotificatiesCustomTabComponent {}
