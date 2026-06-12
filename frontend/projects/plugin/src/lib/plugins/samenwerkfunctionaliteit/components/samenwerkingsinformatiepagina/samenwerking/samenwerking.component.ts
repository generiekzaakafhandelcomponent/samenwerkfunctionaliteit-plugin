import {Component, input} from "@angular/core";
import {InputModule} from 'carbon-components-angular';
import {Samenwerking} from "../model/samenwerking.model";


@Component({
  selector: 'samenwerking',
  templateUrl: './samenwerking.component.html',
  standalone: true,
  styleUrl: './samenwerking.component.scss',
  imports: [
    InputModule,
  ]
})
export class SamenwerkingComponent {
  samenwerking = input.required<Samenwerking>();
}
