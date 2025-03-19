import { convertEnumToString } from './convertEnumToString';

export const enumToOptions = <T extends Record<string, string>>(enumObj: T) => {
  return Object.values(enumObj).map(value => ({
    label: convertEnumToString(value),
    value,
  }));
};
