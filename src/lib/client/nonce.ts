export const fetchNonce = async (): Promise<string> => {
    const response = await fetch('/api/generate-nonce');

    if (!response.ok) {
        throw new Error('Failed to generate nonce');
    }

    const { nonce } = await response.json();
    return nonce;
}

/**
 * Fetches a nonce and immediately calls the API with it
 * This ensures the nonce is fresh and reduces the chance of replay attacks
 */
export const fetchWithNonce = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const nonce = await fetchNonce();

    // Add nonce to URL parameters
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('nonce', nonce);

    return fetch(urlObj.toString(), options);
}
