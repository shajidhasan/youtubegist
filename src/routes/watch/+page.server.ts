import { databases } from '$lib/server/appwrite.js';
import type { SummaryData } from '$lib/types.js';
import { error } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const load = async ({ url }) => {
	const videoId = url.searchParams.get('v');

	if (!videoId || videoId.length !== 11) {
		return error(400, 'Bad YouTube video ID!');
	}

	try {
		const { documents } = await databases.listDocuments<SummaryData>('main', 'summaries', [
			Query.equal('videoId', videoId)
		]);

		if (documents.length > 0) {
			const summary = documents[0];

			const updateHits = databases.incrementDocumentAttribute('main', 'summaries', summary.$id, 'hits', 1)

			return { summaryData: summary, updateHits };
		}

		return { summaryData: null };
	} catch (e) {
		console.error('Failed to check if summary was cached:', e);
		return { summaryData: null };
	}
};