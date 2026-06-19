import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-me';

/**
 * Encrypt sensitive data (e.g., Aadhaar numbers)
 * @param data - Data to encrypt
 * @returns Encrypted data in format: iv:encryptedData
 */
export function encryptData(data: string): string {
  try {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32), 'utf8');
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    throw new Error('Error encrypting data');
  }
}

/**
 * Decrypt encrypted data
 * @param encryptedData - Data in format: iv:encryptedData
 * @returns Decrypted data
 */
export function decryptData(encryptedData: string): string {
  try {
    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32), 'utf8');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    let decrypted = decipher.update(parts[1], 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error('Error decrypting data');
  }
}

/**
 * Mask Aadhaar number for display (show only last 4 digits)
 * @param aadhaar - Full Aadhaar number
 * @returns Masked Aadhaar (e.g., ****-****-1234)
 */
export function maskAadhaar(aadhaar: string): string {
  if (!aadhaar || aadhaar.length < 4) {
    return '****-****-****';
  }
  return `****-****-${aadhaar.slice(-4)}`;
}