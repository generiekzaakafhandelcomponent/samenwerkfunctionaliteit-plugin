import {BerichtNotification} from "../interface/bericht-notification.interface"

export const SuccessNotification: BerichtNotification = {
  type: "success",
  titleKey: "stuurBericht.notification.success.title",
  messageKey: "stuurBericht.notification.success.message",
};

export const ErrorNotification: BerichtNotification = {
  type: "error",
  titleKey: "stuurBericht.notification.error.title",
  messageKey: "stuurBericht.notification.error.message",
};
