import { BerichtNotification } from "../interface/bericht-notification.interface"

export const SuccessNotification: BerichtNotification = {
  type: "success",
  title: "Verzonden:",
  message: "Het bericht is succesvol verzonden.",
};

export const ErrorNotification: BerichtNotification = {
  type: "error",
  title: "Bericht kon niet worden verstuurd:",
  message:
    "Er ging iets mis tijdens het verzenden van het bericht. Neem contact op met uw beheerder als dit probleem zich vaker voordoet.",
};
