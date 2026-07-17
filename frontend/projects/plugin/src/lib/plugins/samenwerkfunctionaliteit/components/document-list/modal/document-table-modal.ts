import { Component, inject, input, InputSignal } from '@angular/core';

import {
  AlertModalType,
  ModalButton,
  ModalService,
} from 'carbon-components-angular';

@Component({
  selector: 'document-table-modal',
  template: ``,
  standalone: true,
})
export class DocumentTableModal {
  modalService: ModalService = inject(ModalService);

  modalType: InputSignal<AlertModalType> = input.required<AlertModalType>();
  modalLabel: InputSignal<string> = input<string>();
  modalTitle: InputSignal<string> = input.required<string>();
  modalContent: InputSignal<string> = input.required<string>();
  buttons: InputSignal<Array<ModalButton>> =
    input.required<Array<ModalButton>>();
  size: InputSignal<'xs' | 'sm' | 'md' | 'lg'> = input.required<
    'xs' | 'sm' | 'md' | 'lg'
  >();
  showCloseButton: InputSignal<boolean> = input.required<boolean>();

  openModal(): void {
    this.modalService.show({
      type: this.modalType(),
      label: this.modalLabel(),
      title: this.modalTitle(),
      content: this.modalContent(),
      size: this.size(),
      buttons: this.buttons(),
      showCloseButton: this.showCloseButton(),
    });
  }
}
