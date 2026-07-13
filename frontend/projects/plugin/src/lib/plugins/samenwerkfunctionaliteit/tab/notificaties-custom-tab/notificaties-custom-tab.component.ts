import { Component } from "@angular/core";
import { NoticatieCardList } from "../../components/notificatie-card-list/notificatie-card-list.component";

@Component({
  selector: "notificaties-custom-tab",
  imports: [NoticatieCardList],
  templateUrl: "./notificaties-custom-tab.component.html",
  styleUrl: "./notificaties-custom-tab.component.scss",
  standalone: true,
})
export class NotificatiesCustomTab {}
