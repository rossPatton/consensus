import crypto from 'crypto';
const { PEPPER } = process.env;
const algo = 'AES-256-CTR';

/**
 * Base64 encrypt using our secret pepper and some random bytes
 * @param input the string we want to encrypt. typically double-hashed pws
 */
export const encrypt = (input: string) => {
  const IV = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algo, PEPPER as string, IV);
  cipher.setEncoding('base64');
  cipher.write(input);
  cipher.end();
  return `${cipher.read()}!${IV.toString('base64')}`;
};

/**
 * Base64 decrypt using our secret pepper and some random bytes
 * @param input the string we want to decrypt. typically double-hashed encrypted pws
 */
export const decrypt = (input: string) => {
  let result;
  const [cipherText, IV] = input.split('!');
  const buffIV = Buffer.from(IV, 'base64');
  const decipher = crypto.createDecipheriv(algo, PEPPER as string, buffIV);
  result = decipher.update(cipherText, 'base64', 'utf8');
  result += decipher.final('utf8');
  return result;
};
