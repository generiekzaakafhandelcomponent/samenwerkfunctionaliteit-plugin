import {
  AlertModalData,
  AlertModalType,
  ModalButtonType,
} from 'carbon-components-angular';

export const documentTableDeleteModalConfig: AlertModalData = {
  type: AlertModalType.default,
  title: 'Document verwijderen',
  content:
    '<h4>Weet je zeker dat je dit document wilt verwijderen? Dit kan niet ongedaan worden gemaakt.</h4>',
  size: 'sm',
  buttons: [
    {
      text: 'Nee',
      type: ModalButtonType.secondary,
    },
    {
      text: 'Ja',
      type: ModalButtonType.primary,
    },
  ],
  showCloseButton: true,
};
