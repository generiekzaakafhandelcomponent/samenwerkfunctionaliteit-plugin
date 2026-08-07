import { Component, input, InputSignal } from '@angular/core';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import { ActieverzoekCardComponent } from './actieverzoek-card/actieverzoek-card.component';

@Component({
  selector: 'update-actieverzoek-status',
  imports: [ActieverzoekCardComponent],
  templateUrl: './update-actieverzoek-status.component.html',
  styleUrl: './update-actieverzoek-status.component.scss',
})
export class UpdateActieverzoekStatusComponent {
  actieverzoek: InputSignal<Actieverzoek> = input.required<Actieverzoek>();
}
