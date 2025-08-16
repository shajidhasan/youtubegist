import { databases } from '$lib/server/appwrite.js';
import type { SummaryData } from '$lib/types.js';
import { error } from '@sveltejs/kit';
import { Query } from 'node-appwrite';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
    try {
        const summaries = await databases.listDocuments<SummaryData>(
            'main',
            'summaries',
            [
                Query.orderDesc('$createdAt'),
                Query.limit(50),
                Query.select(['$id', 'title', 'videoId', '$createdAt', 'hits'])
            ]
        );

        return {
            summaries: summaries.documents
        };
    } catch (e) {
        console.error('Failed to fetch recent summaries:', e);
        throw error(500, 'Failed to fetch recent summaries');
    }
};
