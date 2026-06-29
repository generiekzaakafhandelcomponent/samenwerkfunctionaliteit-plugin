import {Component, input} from "@angular/core";
import {InputModule} from 'carbon-components-angular';
import {Samenwerking} from "../../../models/samenwerking.model";
import {TitleCasePipe} from "@angular/common";


@Component({
  selector: 'samenwerkingsstatus',
  templateUrl: './samenwerkingsstatus.component.html',
  standalone: true,
  styleUrl: './samenwerkingsstatus.component.scss',
  imports: [
    InputModule,
    TitleCasePipe
  ]
})
export class SamenwerkingsStatusComponent {
  samenwerking = input.required<Samenwerking>();
}
