import crypto from 'crypto';

export const sha256 = (input: string) => {
  const hasher = crypto.createHash('SHA256');
  hasher.update(input);
  return hasher.digest('base64');
};

export const sha384 = (input: string) => {
  const hasher = crypto.createHash('SHA384');
  hasher.update(input);
  return hasher.digest('base64');
};

export const sha512 = (input: string) => {
  const hasher = crypto.createHash('SHA512');
  hasher.update(input);
  return hasher.digest('base64');
};
