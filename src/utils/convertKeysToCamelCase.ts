export const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const convertKeysToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = toCamelCase(key);
        (acc as Record<string, unknown>)[camelKey] = convertKeysToCamelCase(
          (obj as Record<string, unknown>)[key]
        );
        return acc;
      },
      {} as Record<string, unknown>
    ) as T;
  }
  return obj;
};
