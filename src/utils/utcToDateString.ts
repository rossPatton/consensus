// we store dates as UTC strings in the DB
// often we want to return that as a human readable date for the client
export const utcToDateString = (obj: { date: string }): any => {
  const date = new Date(obj.date);
  return {
    ...obj,
    date: date.toLocaleString('en-US'),
  };
};
