import { generateNonce } from '$lib/server/nonce.js';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const nonce = generateNonce();

    return json({ nonce });
};
