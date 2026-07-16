import { NotificatieCardInterface } from "../interface/notificatie-card.interface";
import { Component, computed, inject, input, Signal } from "@angular/core";
import { NotificatieCardTypes } from "../type/notificatie-card.type";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { SkeletonModule } from "carbon-components-angular";
import { DatePipe } from "@angular/common";
import { NotificatieCardInput } from "../model/notificatie-card-input.model";

@Component({
  templateUrl: "./notificatie-card.component.html",
  styleUrls: ["./notificatie-card.component.scss"],
  selector: "swf-notificatie-card",
  imports: [TranslatePipe, SkeletonModule, DatePipe],
})
export class NotificatieCardComponent implements NotificatieCardInterface {
  protected translate = inject(TranslateService);

  inputs = input<NotificatieCardInput>({ ...new NotificatieCardInput(), type: NotificatieCardTypes.Skeleton });

  protected capitalizedContent: Signal<string> = computed(() => this.capitalize(this.inputs().content));
  protected isSkeleton = computed(() => this.inputs().type === NotificatieCardTypes.Skeleton);
  protected cardClass: string = "";
  protected typeText: string = "";

  ngOnInit() {
    this.cardClass = this.inputs().type?.toLowerCase() ?? "";
    this.typeText = this.getTypeText();
  }

  private capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  private getTypeText() {
    switch (this.inputs().type) {
      case NotificatieCardTypes.Document:
        return "samenwerkfunctionaliteit.notifications.types.document";
      case NotificatieCardTypes.Message:
        return "samenwerkfunctionaliteit.notifications.types.message";
      case NotificatieCardTypes.Status:
        return "samenwerkfunctionaliteit.notifications.types.status";
      case NotificatieCardTypes.System:
        return "samenwerkfunctionaliteit.notifications.types.system";
      default:
        return "";
    }
  }
}
