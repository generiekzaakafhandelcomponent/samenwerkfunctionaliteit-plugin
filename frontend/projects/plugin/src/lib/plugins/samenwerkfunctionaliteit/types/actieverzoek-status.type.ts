export const ActieverzoekStatusTypes = {
  Open: 'OPEN',
  InProgress: 'IN_PROGRESS',
  Rejected: 'REJECTED',
  Withdrawn: 'WITHDRAWN',
  ReportedReady: 'REPORTED_READY',
  Ready: 'READY',
} as const;

export const ActieverzoekFinalStatusTypes = {
  Rejected: 'REJECTED',
  Withdrawn: 'WITHDRAWN',
  Ready: 'READY',
} as const;

export type ActieverzoekStatusType =
  (typeof ActieverzoekStatusTypes)[keyof typeof ActieverzoekStatusTypes];

export type ActieverzoekFinalStatusType =
  (typeof ActieverzoekFinalStatusTypes)[keyof typeof ActieverzoekFinalStatusTypes];

export type ActieverzoekStatusTypeOption = {
  value: ActieverzoekStatusType;
  label: string;
};

export const ActieverzoekStatusValueToKey = Object.fromEntries(
  Object.entries(ActieverzoekStatusTypes).map(([key, value]) => [value, key]),
) as {
  [V in ActieverzoekStatusType]: keyof typeof ActieverzoekStatusTypes;
};

export const ActieverzoekStatusList = Object.values(
  ActieverzoekStatusTypes,
) as ActieverzoekStatusType[];

export function getActieverzoekTypeText(
  actieverzoekStatusType: ActieverzoekStatusType,
): string {
  switch (actieverzoekStatusType) {
    case ActieverzoekStatusTypes.Open:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.open';
    case ActieverzoekStatusTypes.InProgress:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.inProgress';
    case ActieverzoekStatusTypes.Rejected:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.rejected';
    case ActieverzoekStatusTypes.Withdrawn:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.withdrawn';
    case ActieverzoekStatusTypes.ReportedReady:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.reportedReady';
    case ActieverzoekStatusTypes.Ready:
      return 'samenwerkfunctionaliteit.actieverzoekStatusTypes.ready';
    default:
      throw Error('Unknown actieverzoek status type');
  }
}

export function isActieverzoekFinalStatus(
  status: ActieverzoekStatusType,
): status is ActieverzoekFinalStatusType {
  return (
    status === ActieverzoekFinalStatusTypes.Rejected ||
    status === ActieverzoekFinalStatusTypes.Withdrawn ||
    status === ActieverzoekFinalStatusTypes.Ready
  );
}
