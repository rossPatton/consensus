import bcrypt from 'bcryptjs';

import { decrypt, sha384 } from '.';

/**
 * Use bcrypt to compare user-provided with one in the db
 * DB password is encrypted and hashed. bcrypt compares the hashes
 * @param userPw user's plaintext password (ie, from the login page)
 * @param dbPw the stored password in the db, provided user entered a correct login
 */
export const isValidPw = async (userPw: string, dbPw: string) => {
  if (!userPw || !dbPw) return false;

  // we input the sha of the plaintext into bcrypt when we hash
  // so to compare properly we have to do that again here
  const sha = sha384(userPw);

  // decrypt our encrypted salted and hashed db password
  const decryptedPW = decrypt(dbPw);

  // compare the sha'd input to the decrypted bcrypt hash in the DB
  return bcrypt.compare(sha, decryptedPW);
};
