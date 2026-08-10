import { Component, input, InputSignal } from '@angular/core';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import { DatePipe } from '@angular/common';
import { InputModule } from 'carbon-components-angular';
import { capitalize } from '../../../utils/capitalize';

@Component({
  selector: 'actieverzoek-card',
  imports: [DatePipe, InputModule],
  templateUrl: './actieverzoek-card.component.html',
  styleUrl: './actieverzoek-card.component.scss',
})
export class ActieverzoekCardComponent {
  actieverzoek: InputSignal<Actieverzoek> = input.required<Actieverzoek>();
  protected capitalize = capitalize;
}
