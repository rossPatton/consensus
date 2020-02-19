import fs from 'fs';
import loglevel from 'loglevel';

// for those occasions when we want to make json out of something
export const exportObjToJson = async (data: object, filename: string) => {
  return fs.writeFile(filename, JSON.stringify(data), loglevel.error);
};
