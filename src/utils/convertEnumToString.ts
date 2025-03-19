export const convertEnumToString = (string: string): string => {
  const formattedString = string
    .replace(/_/g, ' ')
    .replace(/^\w/, char => char.toUpperCase());

  return (
    formattedString.charAt(0).toUpperCase() +
    formattedString.slice(1).toLowerCase()
  );
};
