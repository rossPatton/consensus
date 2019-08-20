import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';

// add a little pepper to the salt - hard coded server key for extra security
const { PEPPER } = process.env;

// userPassword === plaintext input from client
// dbPW= === double hashed password in the db
export const isValidPw = async (userPw: string, dbPw: string) => {
  if (!userPw || !dbPw) return false;
  const sha = sha256(userPw + PEPPER);
  return bcrypt.compare(sha, dbPw);
};
