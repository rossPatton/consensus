import bcrypt from 'bcryptjs';

import { decrypt, sha384 } from '.';

// userPassword === plaintext input from client
// dbPW= === double hashed and encrypted password in the db
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
