export const ActieverzoekStatusTypes = {
  Open: 'OPEN',
  InProgress: 'IN_PROGRESS',
  Rejected: 'REJECTED',
  Withdrawn: 'WITHDRAWN',
  ReportedReady: 'REPORTED_READY',
  Ready: 'READY',
} as const;

export type ActieverzoekStatusType =
  (typeof ActieverzoekStatusTypes)[keyof typeof ActieverzoekStatusTypes];

export const ActieverzoekStatusList = Object.values(
  ActieverzoekStatusTypes,
) as ActieverzoekStatusType[];
