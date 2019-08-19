import crypto from 'crypto';

// our encryption key, must be 256 bits (32 characters)
const { PEPPER } = process.env;
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (txt: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(PEPPER as string),
    iv
  );

  let encrypted = cipher.update(txt);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (txt: string) => {
  const textParts = txt.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(PEPPER as string),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
