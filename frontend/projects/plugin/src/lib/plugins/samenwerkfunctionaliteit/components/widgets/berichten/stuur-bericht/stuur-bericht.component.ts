import { Component, inject, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputModule, ButtonModule, IconModule, IconService, NotificationModule } from "carbon-components-angular";
import { FormsModule } from "@angular/forms";
import { Send32 } from "@carbon/icons";
import { ActivatedRoute } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { finalize, take, tap } from "rxjs";
import { BerichtenService } from "../../../../service/berichten.service";
import { SwfDocumentService } from "../../../../service/swf-document.service";
import { CustomWidget } from "@valtimo/layout";
import { BerichtNotification } from "../../../../interface/bericht-notification.interface";
import { BusinessKey } from "../../../../models/business-key.model";

@Component({
  selector: "stuur-bericht",
  imports: [InputModule, ButtonModule, IconModule, FormsModule, NotificationModule, CommonModule],
  templateUrl: "./stuur-bericht.component.html",
  styleUrl: "./stuur-bericht.component.scss",
})
export class StuurBerichtComponent {
  @Input() public widgetConfiguration: CustomWidget | null = null;

  private documentId: string | null = null;
  private actieverzoekId: string | null | undefined;
  private notificationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly NOTIFICATION_TIMEOUT_DURATION = 4500;

  notification = signal<BerichtNotification | null>(null);
  isSubmitting = signal(false);

  successNotification: BerichtNotification = {
    type: "success",
    title: "Verzonden:",
    message: "Het bericht is succesvol verzonden.",
  };

  errorNotification: BerichtNotification = {
    type: "error",
    title: "Bericht kon niet worden verstuurd:",
    message:
      "Er ging iets mis tijdens het verzenden van het bericht. Neem contact op met uw beheerder als dit probleem zich vaker voordoet.",
  };

  placeholder = "Type hier uw bericht";
  rows = 10;
  enableCounter = true;
  maxLength = 512;
  message = "";

  route = inject(ActivatedRoute);
  private berichtenService = inject(BerichtenService);
  private swfService = inject(SwfDocumentService);
  private readonly logger = inject(NGXLogger);
  private readonly iconService = inject(IconService);

  ngOnInit() {
    this.iconService.registerAll([Send32]);
    this.documentId = this.swfService.getParam(this, "documentId");
    this.retrieveActieverzoekId();
  }

  onClick() {
    this.notification.set(null);

    if (!this.actieverzoekId?.trim()) {
      this.logger.warn("Unable to post message: No actieverzoekId available.");
      this.assignNotification(this.errorNotification, false);
      return;
    }
    this.isSubmitting.set(true);
    this.berichtenService
      .postBericht(this.actieverzoekId, this.message)
      .pipe(
        take(1),
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          this.assignNotification(this.successNotification, true);
          this.message = "";
        },
        error: (response) => {
          this.logger.debug(response);
          this.assignNotification(this.errorNotification, false);
        },
      });
  }

  private retrieveActieverzoekId() {
    const valtimoBusinessKey: BusinessKey = { value: this.documentId! };
    this.swfService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        tap((props) => {
          this.actieverzoekId = props.actieverzoekId;
        }),
      )
      .subscribe();
  }

  private assignNotification(notification: BerichtNotification, shouldCloseAutomatically: boolean) {
    if (this.notificationTimeoutId) {
      clearTimeout(this.notificationTimeoutId);
      this.notificationTimeoutId = null;
    }

    this.notification.set(notification);

    if (shouldCloseAutomatically) {
      this.notificationTimeoutId = setTimeout(() => {
        this.notification.set(null);
        this.notificationTimeoutId = null;
      }, this.NOTIFICATION_TIMEOUT_DURATION);
    }
  }
}
