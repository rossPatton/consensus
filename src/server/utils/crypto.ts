import crypto from 'crypto';
const { PEPPER } = process.env;
const algo = 'AES-256-CTR';

export const encrypt = (input: string) => {
  const IV = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algo, PEPPER as string, IV);
  cipher.setEncoding('base64');
  cipher.write(input);
  cipher.end();

  const cipherText = cipher.read();

  return `${cipherText}!${IV.toString('base64')}`;
};

export const decrypt = (input: string) => {
  let result;
  const [cipherText, IV] = input.split('!');
  const buffIV = Buffer.from(IV, 'base64');
  const decipher = crypto.createDecipheriv(algo, PEPPER as string, buffIV);
  result = decipher.update(cipherText, 'base64', 'utf8');
  result += decipher.final('utf8');
  return result;
};
