import { Component, inject, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputModule, ButtonModule, IconModule, IconService, NotificationModule } from "carbon-components-angular";
import { FormsModule } from "@angular/forms";
import { Send32 } from "@carbon/icons";
import { ActivatedRoute } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { finalize, take, tap } from "rxjs";
import { BerichtenService } from "../../../service/berichten.service";
import { SwfDocumentService } from "../../../service/swf-document.service";
import { BerichtNotification } from "../../../interface/bericht-notification.interface";
import { SuccessNotification, ErrorNotification } from "../../../config/bericht-notification-config";
import { BusinessKey } from "../../../models/business-key.model";
import { SamenwerkingProperties } from "../../../models/samenwerking-properties.model";

@Component({
  selector: "stuur-bericht",
  imports: [InputModule, ButtonModule, IconModule, FormsModule, NotificationModule, CommonModule],
  templateUrl: "./stuur-bericht.component.html",
  styleUrl: "./stuur-bericht.component.scss",
})
export class StuurBerichtComponent {

  private actieverzoekId: string | null | undefined;
  private notificationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly NOTIFICATION_TIMEOUT_DURATION = 4500;

  notification = signal<BerichtNotification | null>(null);
  isSubmitting = signal(false);
  isMissingActieverzoekId = signal<boolean>(false);

  placeholder = "Type hier uw bericht";
  rows = 5;
  maxLength = 512;
  message = "";

  route = inject(ActivatedRoute);
  private berichtenService = inject(BerichtenService);
  private swfService = inject(SwfDocumentService);
  private readonly logger = inject(NGXLogger);
  private readonly iconService = inject(IconService);

  ngOnInit() {
    this.iconService.registerAll([Send32]);
    const documentId = this.swfService.getParam(this.route, "documentId");
    this.retrieveActieverzoekId(documentId!);
  }

  onClick() {
    this.notification.set(null);

    if (!this.actieverzoekId) {
      this.logger.warn("Unable to post message: No actieverzoekId available.");
      this.assignNotification(ErrorNotification, false);
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
          this.assignNotification(SuccessNotification, true);
          this.message = "";
        },
        error: (response) => {
          this.logger.error(response);
          this.assignNotification(ErrorNotification, false);
        },
      });
  }

  private retrieveActieverzoekId(documentId: string) {
    const valtimoBusinessKey: BusinessKey = { value: documentId };
    this.swfService
      .getSamenwerkingProperties(valtimoBusinessKey)
      .pipe(
        take(1),
        tap((props: SamenwerkingProperties) => {
          if (props.actieverzoekId) {
            this.actieverzoekId = props.actieverzoekId;
          } else {
            throw new Error("Dossier heeft geen actieverzoekId .");
          }
        }),
      )
      .subscribe({
        error: (error) => {
          this.logger.error("Unable to retrieve samenwerking properties", error);
          this.isMissingActieverzoekId.set(true);
        },
      });
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
