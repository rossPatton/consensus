import bcrypt from 'bcryptjs';
import { sha384 } from '.';

// takes a text input (usually a password) and returned a salted hash
export const saltedHash = async (plaintextPW: string) => {
  // bycrypt truncates long inputs -
  // so this first hash just converts our string to a fixed length
  const sha = sha384(plaintextPW);

  // 10 rounds before applying the salt to our fixed length sha
  const salt = await bcrypt.genSalt(10);

  // secure hash with bcrypt, using our original hash + our random salt
  return bcrypt.hash(sha, salt);
};
