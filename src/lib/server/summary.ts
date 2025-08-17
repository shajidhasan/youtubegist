import { OPENROUTER_API_KEY, OPENROUTER_MODEL } from '$env/static/private';
import OpenAI from 'openai';
import prompt from "$lib/server/prompt.md?raw";
import type { SummaryData, VideoMeta } from '$lib/types';

const openai = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: OPENROUTER_API_KEY,
	defaultHeaders: {
		'HTTP-Referer': 'https://youtubegist.com',
		'X-Title': 'youtubegist',
	},
});

const responseSchema = {
	type: "object",
	required: ["keyTakeaway", "summary", "keyPoints", "coreTerms"],
	properties: {
		keyTakeaway: {
			type: "string",
		},
		summary: {
			type: "string",
		},
		keyPoints: {
			type: "array",
			items: {
				type: "string",
			},
		},
		coreTerms: {
			type: "array",
			items: {
				type: "string",
			},
		},
	},
	additionalProperties: false,
};

export const getSummary = async (videoData: VideoMeta, language: string = 'en') => {
	try {
		const languageNames: Record<string, string> = {
			'en': 'English',
			'ru': 'Russian',
			'es': 'Spanish',
			'fr': 'French',
			'de': 'German',
			'zh': 'Chinese',
			'ja': 'Japanese',
			'ko': 'Korean'
		};

		const targetLanguage = languageNames[language] || 'English';

		const data = {
			title: videoData.title,
			description: videoData.description,
			author: videoData.author,
			transcript: videoData.transcript,
			language: targetLanguage
		};

		const response = await openai.chat.completions.create({
			model: OPENROUTER_MODEL,
			messages: [
				{
					role: "system",
					content: prompt
				},
				{
					role: "user",
					content: JSON.stringify(data)
				}
			],
			response_format: {
				type: "json_schema",
				json_schema: {
					name: "video_summary",
					schema: responseSchema
				}
			},
		});

		const content = response.choices[0].message.content;
		if (!content) {
			throw new Error('No content received from OpenRouter');
		}

		return JSON.parse(content) as SummaryData;
	} catch (error) {
		console.error('Failed to generate summary:', error);
		throw new Error('Failed to generate summary.');
	}
};