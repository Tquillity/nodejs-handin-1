import crypto from 'crypto';

/**
 * Creates a SHA-256 hash of the given string.
 * @param {string} stringToHash - The input string to be hashed.
 * @returns {string} - The resulting SHA-256 hash in hexadecimal format. 
 */
export const createHash = (stringToHash) => {
  return crypto.createHash('sha256').update(stringToHash).digest('hex');
};