export const ActieverzoekStatusTypes = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
  REPORTED_READY: 'REPORTED_READY',
  READY: 'READY',
} as const;

export type ActieverzoekStatusType =
  (typeof ActieverzoekStatusTypes)[keyof typeof ActieverzoekStatusTypes];
