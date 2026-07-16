export const NotificatieCardTypes = {
  Status: "STATUS",
  Document: "DOCUMENT",
  System: "SYSTEM",
  Message: "MESSAGE",
  Skeleton: "SKELETON",
} as const;

export type NotificatieCardType = (typeof NotificatieCardTypes)[keyof typeof NotificatieCardTypes];
