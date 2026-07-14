import { NotificatieCardInterface } from "../interface/notificatie-card.interface";
import { Component, computed, inject, input, Signal, signal } from "@angular/core";
import { NotificatieCardTypes } from "../type/notificatie-card.type";
import { TranslateLoader, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader"; // Note: the path to Samenwerkfunctionaliteit's non-plugin translations was added in 'environments.ts' under 'translationResources'
import { HttpClient } from "@angular/common/http";
import { SkeletonModule } from "carbon-components-angular";
import { DatePipe } from "@angular/common";
import { NotificatieCardInput } from "../model/notificatie-card-input.model";

@Component({
  templateUrl: "./notificatie-card.component.html",
  styleUrls: ["./notificatie-card.component.scss"],
  selector: "swf-notificatie-card",
  standalone: true,
  imports: [TranslatePipe, SkeletonModule, DatePipe],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) => new TranslateHttpLoader(http, "/assets/i18n/samenwerkfunctionaliteit/", ".json"),
    },
  ],
})
export class NotificatieCardComponent implements NotificatieCardInterface {
  protected translate = inject(TranslateService);
  protected capitalizedContent: Signal<string> = computed(() => this.capitalize(this.inputs().content));

  inputs = input<NotificatieCardInput>({
    notificatieId: "",
    content: "",
    eventDateTime: null,
    initiatorNaam: "",
    title: "",
    type: NotificatieCardTypes.Skeleton,
  });

  isSkeleton = computed(() => this.inputs().type === NotificatieCardTypes.Skeleton);

  ngOnInit() {}

  capitalize(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  getTypeText() {
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
