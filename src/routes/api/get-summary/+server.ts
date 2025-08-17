import { databases } from '$lib/server/appwrite.js';
import { getSummary } from '$lib/server/summary.js';
import { getVideoData } from '$lib/server/videoData.js';
import { validateNonce } from '$lib/server/nonce.js';
import type { SummaryData } from '$lib/types.js';
import { error, json } from '@sveltejs/kit';
import { ID } from 'node-appwrite';

export const GET = async ({ url }) => {
    const videoId = url.searchParams.get('v');
    const nonce = url.searchParams.get('nonce');
    const language = url.searchParams.get('lang') || 'en';

    if (!videoId || videoId.length !== 11) {
        return error(400, 'Bad YouTube video ID!');
    }

    if (!nonce || !validateNonce(nonce)) {
        return error(401, 'Invalid or expired nonce!');
    }

    try {
        // Time getVideoData
        const videoData = await getVideoData(videoId);

        const unsavedSummaryData = await getSummary(videoData, language);


        const summaryData = await databases.createDocument<SummaryData>(
            'main',
            'summaries',
            ID.unique(),
            {
                videoId,
                title: videoData.title,
                summary: unsavedSummaryData.summary,
                keyPoints: unsavedSummaryData.keyPoints,
                keyTakeaway: unsavedSummaryData.keyTakeaway,
                coreTerms: unsavedSummaryData.coreTerms,
                meta: JSON.stringify({
                    channelId: videoData.channelId,
                    author: videoData.author,
                    language: language
                })
            }
        );

        return json(summaryData);
    } catch (e) {
        console.error('Failed to process video:', e);
        return error(500, 'Failed to process video. Please try again later.');
    }
};