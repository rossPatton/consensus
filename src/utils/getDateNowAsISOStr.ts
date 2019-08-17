import { padDate } from './padDate';

// TODO remove all this date manipulation stuff and just use dayjs
// convert Date.now() to date string (useful for inputs, etc)
// optionally - set the hour, useful for time inputs
export const getDateNowAsISOStr = (): string => {
  const date = new Date(Date.now());
  const yr = date.getFullYear();
  const mo = date.getMonth();
  const day = date.getDate();
  return `${yr}-${padDate(mo + 1)}-${padDate(day)}`;
};
