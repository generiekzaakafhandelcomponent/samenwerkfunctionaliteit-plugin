export const NotificatieTypes = {
  DocumentEdited: "DOCUMENT_EDITED",
  DocumentCreated: "DOCUMENT_CREATED",
  DocumentDeleted: "DOCUMENT_DELETED",
  ActieverzoekStatusChanged: "ACTIEVERZOEK_STATUS_CHANGED",
  InvitationPartnerOrganization: "INVITATION_PARTNER_ORGANIZATION",
  MessageSent: "MESSAGE_SENT",
  RequestRetrievalSucceeded: "REQUEST_RETRIEVAL_SUCCEEDED",
  Skeleton: "SKELETON",
} as const;

export type NotificatieType = (typeof NotificatieTypes)[keyof typeof NotificatieTypes];
