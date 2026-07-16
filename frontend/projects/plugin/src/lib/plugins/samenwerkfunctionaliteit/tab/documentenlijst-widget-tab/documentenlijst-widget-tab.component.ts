import { Component } from "@angular/core";
import { DocumentListComponent } from "../../components/document-list/document-list.component";

@Component({
  templateUrl: `./documentenlijst-widget-tab.component.html`,
  selector: "document-table-widget-tab",
  imports: [DocumentListComponent],
})
export class DocumentenlijstWidgetTabComponent {}
