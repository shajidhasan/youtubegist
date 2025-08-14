import { extractVideoId } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = true;

export const load = ({ url }) => {
    const text = url.searchParams.get('text') || '';

    const videoId = extractVideoId(text);

    if (videoId !== null) {
        redirect(308, `/watch?v=${videoId}`)
    }
}