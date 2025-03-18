export const toSnakeCase = (str: string): string =>
  str.replace(/([A-Z])/g, '_$1').toLowerCase();

export const convertKeysToSnakeCase = <T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> => {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce<Record<string, unknown>>(
      (acc, [key, value]) => {
        const snakeKey = toSnakeCase(key);
        acc[snakeKey] = convertKeysToSnakeCase(
          value as Record<string, unknown>
        );
        return acc;
      },
      {}
    );
  }
  return obj;
};
