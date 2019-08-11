// convert date string from inputs to real Date
export const parseISOLocalString = (s: string) => {
  const b = s.split(/\D/);
  const year = parseInt(b[0], 10);
  const month = parseInt(b[1], 10) - 1;
  const date = parseInt(b[2], 10);
  return new Date(year, month, date);
};
