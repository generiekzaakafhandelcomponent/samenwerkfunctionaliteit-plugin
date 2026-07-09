import { Component, Input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputModule, ButtonModule, IconModule, IconService, NotificationModule } from "carbon-components-angular";
import { FormsModule } from "@angular/forms";
import { Send32 } from "@carbon/icons";
import { ActivatedRoute } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { Document as ValtimoDocument, DocumentService } from "@valtimo/document";
import { finalize, take } from "rxjs";
import { BerichtenService } from "./../../../../service/berichten.service";
import { CustomWidget } from "@valtimo/layout";

type SwfContent = {
  samenwerkfunctionaliteit?: { actieverzoekId: string };
};

type BerichtNotification = {
  type: "success" | "error";
  title: string;
  message: string;
};

@Component({
  selector: "stuur-bericht",
  imports: [InputModule, ButtonModule, IconModule, FormsModule, NotificationModule, CommonModule],
  templateUrl: "./stuur-bericht.component.html",
  styleUrl: "./stuur-bericht.component.scss",
})
export class StuurBerichtComponent {
  @Input() public widgetConfiguration: CustomWidget | null = null;

  private documentId: string | undefined;
  private document: ValtimoDocument | undefined;
  private actieverzoekId: string | null | undefined;

  notification = signal<BerichtNotification | null>(null);
  isSubmitting = signal(false);

  succesNotification: BerichtNotification = {
    type: "success",
    title: "Verzonden:",
    message:
      "Het bericht is succesvol verzonden.",
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

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private berichtenService: BerichtenService,
    private readonly logger: NGXLogger,
    private readonly iconService: IconService,
  ) {
    this.iconService.registerAll([Send32]);
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get("documentId") || "";
    this.documentService
      .getDocument(this.documentId)
      .pipe(take(1))
      .subscribe((doc) => {
        this.document = doc;
        const documentContent = this.document.content as Partial<SwfContent>;
        this.actieverzoekId = documentContent?.samenwerkfunctionaliteit?.actieverzoekId ?? null;
      });
  }

  onClick() {
    this.notification.set(null);

    if (!this.actieverzoekId) {
      this.logger.warn("Unable to post message: No actieverzoekId available.");
      this.notification.set(this.succesNotification);
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
        error: () => {
          this.notification.set(this.errorNotification);
        },
      });
  }
}
