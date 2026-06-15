import {Component, input} from "@angular/core";
import {InputModule} from 'carbon-components-angular';
import {Samenwerking} from "../model/samenwerking.model";


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
  samenwerking = input.required<Samenwerking>();
}
