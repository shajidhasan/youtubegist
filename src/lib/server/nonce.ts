import { NONCE_SECRET } from '$env/static/private';
import { randomBytes, createHash, timingSafeEqual } from 'crypto';

const NONCE_LENGTH = 32; // 256 bits
const NONCE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

const usedNonces = new Set<string>();
let lastCleanup = Date.now();

interface NonceData {
    timestamp: number;
    random: string;
}

export const generateNonce = (): string => {
    const timestamp = Date.now();
    const random = randomBytes(NONCE_LENGTH / 2).toString('hex');
    const payload = `${timestamp}.${random}`;
    const signature = createSignature(payload);

    return `${payload}.${signature}`;
}

export const validateNonce = (nonce: string): boolean => {
    if (!nonce || typeof nonce !== 'string') {
        return false;
    }

    cleanupExpiredNonces();

    if (usedNonces.has(nonce)) {
        return false;
    }

    const parts = nonce.split('.');
    if (parts.length !== 3) {
        return false;
    }

    const [timestampStr, random, providedSignature] = parts;

    if (!timestampStr || !random || !providedSignature) {
        return false;
    }

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) {
        return false;
    }

    const now = Date.now();
    if (now - timestamp > NONCE_EXPIRY) {
        return false;
    }

    const payload = `${timestamp}.${random}`;
    const expectedSignature = createSignature(payload);

    try {
        const providedBuffer = Buffer.from(providedSignature, 'hex');
        const expectedBuffer = Buffer.from(expectedSignature, 'hex');

        if (providedBuffer.length !== expectedBuffer.length) {
            return false;
        }

        const isValid = timingSafeEqual(providedBuffer, expectedBuffer);

        if (isValid) {
            usedNonces.add(nonce);
        }

        return isValid;
    } catch {
        return false;
    }
}

const cleanupExpiredNonces = (): void => {
    const now = Date.now();

    if (now - lastCleanup < CLEANUP_INTERVAL) {
        return;
    }

    const expiredNonces: string[] = [];

    for (const nonce of usedNonces) {
        const parts = nonce.split('.');
        if (parts.length === 3) {
            const timestamp = parseInt(parts[0], 10);
            if (!isNaN(timestamp) && (now - timestamp > NONCE_EXPIRY)) {
                expiredNonces.push(nonce);
            }
        }
    }

    for (const expiredNonce of expiredNonces) {
        usedNonces.delete(expiredNonce);
    }

    lastCleanup = now;
};

const createSignature = (payload: string): string => {
    return createHash('sha256')
        .update(payload + NONCE_SECRET)
        .digest('hex');
}



export const parseNonce = (nonce: string): NonceData | null => {
    const parts = nonce.split('.');
    if (parts.length !== 3) {
        return null;
    }

    const timestamp = parseInt(parts[0], 10);
    if (isNaN(timestamp)) {
        return null;
    }

    return {
        timestamp,
        random: parts[1]
    };
};
