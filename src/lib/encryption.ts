import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const SALT_LENGTH = 64; // 512 bits
const TAG_LENGTH = 16; // 128 bits
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH;

function getKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, 'sha256');
}

/**
 * Encrypts a string using AES-256-GCM
 */
export function encrypt(text: string, password?: string): string {
  const secret = password || process.env.ENCRYPTION_KEY;
  
  if (!secret || secret.length < 32) {
    throw new Error('Encryption key must be at least 32 characters');
  }

  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey(secret, salt);

  const cipher = crypto.createCipherGCM(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

/**
 * Decrypts a string using AES-256-GCM
 */
export function decrypt(encryptedData: string, password?: string): string {
  const secret = password || process.env.ENCRYPTION_KEY;
  
  if (!secret || secret.length < 32) {
    throw new Error('Encryption key must be at least 32 characters');
  }

  const bData = Buffer.from(encryptedData, 'base64');

  const salt = bData.subarray(0, SALT_LENGTH);
  const iv = bData.subarray(SALT_LENGTH, TAG_POSITION);
  const tag = bData.subarray(TAG_POSITION, ENCRYPTED_POSITION);
  const encrypted = bData.subarray(ENCRYPTED_POSITION);

  const key = getKey(secret, salt);

  const decipher = crypto.createDecipherGCM(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8');
}

/**
 * Encrypts an object by converting it to JSON first
 */
export function encryptObject<T>(obj: T, password?: string): string {
  return encrypt(JSON.stringify(obj), password);
}

/**
 * Decrypts an encrypted object back to its original form
 */
export function decryptObject<T>(encryptedData: string, password?: string): T {
  const jsonString = decrypt(encryptedData, password);
  return JSON.parse(jsonString);
}

/**
 * Generates a random key suitable for encryption
 */
export function generateKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hashes a password using PBKDF2
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(32);
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256');
  return salt.toString('hex') + ':' + hash.toString('hex');
}

/**
 * Verifies a password against its hash
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [saltHex, hashHex] = hashedPassword.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256');
  return hash.toString('hex') === hashHex;
}