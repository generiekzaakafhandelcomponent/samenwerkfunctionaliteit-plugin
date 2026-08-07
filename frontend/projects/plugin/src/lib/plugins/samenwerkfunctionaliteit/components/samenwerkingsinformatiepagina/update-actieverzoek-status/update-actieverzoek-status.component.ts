import { Component, input, InputSignal } from '@angular/core';
import { Actieverzoek } from '../../../models/actieverzoek.model';

@Component({
  selector: 'update-actieverzoek-status',
  imports: [],
  templateUrl: './update-actieverzoek-status.component.html',
  styleUrl: './update-actieverzoek-status.component.scss',
})
export class UpdateActieverzoekStatusComponent {
  actieverzoek: InputSignal<Actieverzoek> = input.required<Actieverzoek>();
  protected readonly JSON = JSON;
}
