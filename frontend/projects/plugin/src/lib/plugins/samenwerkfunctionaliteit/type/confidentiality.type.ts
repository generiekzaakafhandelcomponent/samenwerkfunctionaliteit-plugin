export const ConfidentialityTypes = {
  Confidential: "CONFIDENTIAL",
  StrictlyConfidential: "STRICTLY_CONFIDENTIAL",
} as const;

export type ConfidentialityType = (typeof ConfidentialityTypes)[keyof typeof ConfidentialityTypes];
