import { isUUID, toUUID, UUID } from './uuid.type';

export type BusinessKey = UUID & {
  readonly __businessKeyBrand: unique symbol;
};

export function toBusinessKey(value: string): BusinessKey {
  return toUUID(value) as BusinessKey;
}

export function isBusinessKey(value: string): value is BusinessKey {
  return isUUID(value);
}
