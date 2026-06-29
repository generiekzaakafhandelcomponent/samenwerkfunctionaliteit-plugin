import { Component } from "@angular/core";
import { InputModule, ButtonModule, IconModule, IconService } from "carbon-components-angular";
import { FormsModule } from "@angular/forms";
import { Send32 } from "@carbon/icons";
import { ActivatedRoute } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { Document as ValtimoDocument, DocumentService } from "@valtimo/document";
import { take } from "rxjs";

type SwfContent = {
  samenwerkfunctionaliteit?: { actieverzoekId: string };
};

@Component({
  selector: "stuur-bericht",
  imports: [InputModule, ButtonModule, IconModule, FormsModule],
  templateUrl: "./stuur-bericht.component.html",
  styleUrl: "./stuur-bericht.component.scss",
})
export class StuurBerichtComponent {
  private _documentId: string | undefined;
  private _document: ValtimoDocument | undefined;
  private actieverzoekId: string | null;
  placeholder = "Type hier uw bericht";
  rows = 5;
  enableCounter = true;
  maxLength = 512;
  message = "";

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private readonly logger: NGXLogger,
    private readonly iconService: IconService,
  ) {
    this.iconService.registerAll([Send32]);
  }

  ngOnInit() {
    this._documentId = this.route.snapshot.paramMap.get("documentId") || "";
    this.documentService
      .getDocument(this._documentId)
      .pipe(take(1))
      .subscribe((doc) => {
        this._document = doc;
        const documentContent = this._document.content as Partial<SwfContent>;
        this.actieverzoekId = documentContent?.samenwerkfunctionaliteit?.actieverzoekId ?? null;
      });
  }

  onClick() {
    if (!this.actieverzoekId) {
      this.logger.warn("No actieverzoekID found, unable to post message.");
      return;
    }
  }
}
