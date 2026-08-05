import { validate } from 'uuid';

export type UUID = string & {
  readonly __brand: unique symbol;
};

export function isUUID(value: string): value is UUID {
  return validate(value);
}

export function toUUID(value: string): UUID {
  if (!validate(value)) {
    throw new Error(`"${value}" is not a valid UUID.`);
  }

  return value as UUID;
}
