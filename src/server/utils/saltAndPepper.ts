import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';

export const saltAndPepper = async (plaintextPW: string) => {
// add a little pepper to the salt - hard coded server key for extra security
  const { PEPPER } = process.env;

  // bycrypt truncates long inputs - doing it this way ensures no truncation
  const sha = sha256(plaintextPW + PEPPER);

  // 10 rounds before applying the salt to our peppered sha
  const salt = await bcrypt.genSalt(10);

  // return salted and peppered hash
  return await bcrypt.hash(sha, salt);
};
