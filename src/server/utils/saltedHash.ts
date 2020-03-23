import bcrypt from 'bcryptjs';

import { sha384 } from '.';

/**
 * Convert our user's plaintext password into a bcrypt-safe sha384 hash
 * Then we run bcrypt against the hash
 * @param pw user provided plaintext password
 */
export const saltedHash = async (pw: string) => {
  // bycrypt truncates inputs over 72 bytes -
  // so this first hash just converts our string to a safe fixed length
  const sha = sha384(pw);

  // 21 rounds before applying the salt to our now safe fixed length sha
  const salt = await bcrypt.genSalt(12);

  // secure hash with bcrypt, using our original hash + our random salt
  return bcrypt.hash(sha, salt);
};
