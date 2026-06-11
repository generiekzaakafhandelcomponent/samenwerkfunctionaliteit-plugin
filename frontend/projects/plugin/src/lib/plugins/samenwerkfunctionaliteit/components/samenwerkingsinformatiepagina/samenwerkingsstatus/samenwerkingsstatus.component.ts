import {Component, input} from "@angular/core";
import {Status} from "../model/status.model";
import { InputModule } from 'carbon-components-angular';


@Component({
  selector: 'samenwerkingsstatus',
  templateUrl: './samenwerkingsstatus.component.html',
  standalone: true,
  styleUrl: './samenwerkingsstatus.component.scss',
  imports: [
    InputModule
  ]
})
export class SamenwerkingsStatusComponent {
  status = input.required<Status>();

}
