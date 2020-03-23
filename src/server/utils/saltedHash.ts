import bcrypt from 'bcryptjs';

import { sha384 } from '.';

// takes a text input (usually a password) and returned a salted hash
export const saltedHash = async (plaintextPW: string) => {
  // bycrypt truncates inputs over 72 bytes -
  // so this first hash just converts our string to a safe fixed length
  const sha = sha384(plaintextPW);

  // 21 rounds before applying the salt to our now safe fixed length sha
  const salt = await bcrypt.genSalt(12);

  // secure hash with bcrypt, using our original hash + our random salt
  return bcrypt.hash(sha, salt);
};
