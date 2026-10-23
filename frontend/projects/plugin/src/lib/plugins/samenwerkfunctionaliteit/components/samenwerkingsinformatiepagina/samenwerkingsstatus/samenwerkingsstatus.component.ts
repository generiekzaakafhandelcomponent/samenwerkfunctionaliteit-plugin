import {Component, input} from "@angular/core";
import {InputModule} from 'carbon-components-angular';
import {Samenwerking} from "../../../models/samenwerking.model";
import {DatePipe} from "@angular/common";
import {transformStringToNormalCase} from '../../../utils/string.util';


@Component({
  selector: 'samenwerkingsstatus',
  templateUrl: './samenwerkingsstatus.component.html',
  standalone: true,
  styleUrl: './samenwerkingsstatus.component.scss',
  imports: [InputModule, DatePipe],
})
export class SamenwerkingsStatusComponent {
  samenwerking = input.required<Samenwerking>();
  protected readonly transformStringToNormalCase = transformStringToNormalCase;
}
