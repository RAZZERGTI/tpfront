import crypto from 'crypto';

export function sha512Hash(input: string): string {
  const hash = crypto.createHash('sha512');
  hash.update(input);
  return hash.digest('hex');
}
