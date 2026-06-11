import {Component} from "@angular/core";
import {SamenwerkingsStatusComponent} from "../samenwerkingsstatus/samenwerkingsstatus.component";
import {Status} from "../model/status.model";


@Component({
  selector: 'swf-informatie-pagina',
  templateUrl: './swf-informatie-pagina.component.html',
  standalone: true,
  imports: [
    SamenwerkingsStatusComponent
  ],
  styleUrl: './swf-informatie-pagina.component.scss'
})
export class SwfInformatiePaginaComponent {
  status: Status = {
    status: "OPEN"
  };

}
