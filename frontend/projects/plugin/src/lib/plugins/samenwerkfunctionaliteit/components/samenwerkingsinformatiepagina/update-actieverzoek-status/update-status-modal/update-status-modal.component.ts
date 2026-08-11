import { Component, input, InputSignal } from '@angular/core';
import { Actieverzoek } from '../../../../models/actieverzoek.model';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  DropdownModule,
  InputModule,
  ListItem,
} from 'carbon-components-angular';

@Component({
  selector: 'update-status-modal',
  imports: [FormsModule, DropdownModule, InputModule, ButtonModule],
  templateUrl: './update-status-modal.component.html',
  styleUrl: './update-status-modal.component.scss',
})
export class UpdateStatusModalComponent {
  actieverzoek: InputSignal<Actieverzoek> = input.required<Actieverzoek>();
  statusTypeDropdownListItems: InputSignal<ListItem[]> =
    input.required<ListItem[]>();
  updateStatus: ListItem = {
    content: '',
    selected: false,
  };
  explanation: string = '';

  onUpdateStatus(): void {
    console.log(this.updateStatus);
  }
}
