import { Component, input } from '@angular/core';
import { InputModule } from 'carbon-components-angular';
import { Samenwerking } from '../../../models/samenwerking.model';
import { DatePipe } from '@angular/common';
import {
  capitalize,
  transformStringToNormalCase,
} from '../../../utils/string.util';

@Component({
  selector: 'samenwerking',
  templateUrl: './samenwerking.component.html',
  standalone: true,
  styleUrl: './samenwerking.component.scss',
  imports: [InputModule, DatePipe],
})
export class SamenwerkingComponent {
  readonly samenwerking = input.required<Samenwerking>();
  protected readonly capitalize = capitalize;
  protected readonly transformStringToNormalCase = transformStringToNormalCase;
}
