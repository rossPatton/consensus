import fs from 'fs';
import loglevel from 'loglevel';

/**
 * Export javascript object to external javascript file
 * @param data the object to export
 * @param filename what're we calling the new file?
 */
export const exportObjToJson = async (data: object, filename: string) => {
  return fs.writeFile(filename, JSON.stringify(data), loglevel.error);
};
