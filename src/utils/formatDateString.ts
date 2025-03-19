import { format, isValid, parseISO } from 'date-fns';

import { DateFormat } from '@/constants';

export const formatDateString = (
  dateString: string,
  dateFormat: DateFormat
): string => {
  if (!dateString) return 'Invalid Date';

  const date = parseISO(dateString);

  return isValid(date) ? format(date, dateFormat) : 'Invalid Date';
};
