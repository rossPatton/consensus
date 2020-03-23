import crypto from 'crypto';


/**
 * Convert string into hash. 64 bytes output, bcrypt safe
 * @param input user provided string
 */
export const sha384 = (input: string) => {
  const hasher = crypto.createHash('SHA384');
  hasher.update(input);
  return hasher.digest('base64');
};

// for full reference, in case I need to go back and add more hash functions:
// sha256 hex encoded => 64 bytes
// sha256 base64 encoded => 44 bytes

// sha384 hex encoded => 96 bytes
// sha384 base64 encoded => 64 bytes

// sha384 hex encoded => 128 bytes
// sha384 base64 encoded => 88 bytes
