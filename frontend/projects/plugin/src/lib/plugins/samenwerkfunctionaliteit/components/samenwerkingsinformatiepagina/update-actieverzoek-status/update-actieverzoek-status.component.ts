import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Actieverzoek } from '../../../models/actieverzoek.model';
import { ActieverzoekCardComponent } from './actieverzoek-card/actieverzoek-card.component';
import { UpdateStatusModalComponent } from './update-status-modal/update-status-modal.component';
import { ActieverzoekStatusType } from '../../../types/actieverzoek-status.type';
import { ListItem } from 'carbon-components-angular';

@Component({
  selector: 'update-actieverzoek-status',
  imports: [ActieverzoekCardComponent, UpdateStatusModalComponent],
  templateUrl: './update-actieverzoek-status.component.html',
  styleUrl: './update-actieverzoek-status.component.scss',
})
export class UpdateActieverzoekStatusComponent {
  actieverzoek: InputSignal<Actieverzoek> = input.required<Actieverzoek>();
  actieverzoekStatusTypes: InputSignal<ActieverzoekStatusType[]> =
    input.required<ActieverzoekStatusType[]>();
  statusTypeDropdownListItems: WritableSignal<ListItem[]> = signal<ListItem[]>(
    [],
  );
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit() {
    this.buildStatusTypeDropdownListItems();
  }

  private buildStatusTypeDropdownListItems(): void {
    this.statusTypeDropdownListItems.update(() => {
      return this.mapActieverzoekStatusTypesToListItems();
    });
  }

  private mapActieverzoekStatusTypesToListItems(): ListItem[] {
    return this.actieverzoekStatusTypes().map(
      (actieverzoekStatusType: ActieverzoekStatusType): ListItem => {
        return {
          content: actieverzoekStatusType,
          selected: false,
        };
      },
    );
  }
}
