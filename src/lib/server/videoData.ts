import { YOUTUBE_DATA_API_KEY, PROXY_URI } from "$env/static/private";
import type { VideoMeta } from "$lib/types";
import { Innertube, Platform, UniversalCache } from "youtubei.js";
import { getTranscript } from "$lib/server/transcript";
import { ProxyAgent } from 'undici';

const getVideoDataWithYouTubeAPI = async (videoId: string): Promise<VideoMeta> => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${YOUTUBE_DATA_API_KEY}`
	);

	if (!response.ok) {
		throw new Error(`YouTube API error: ${response.status}`);
	}

	const data = await response.json();

	if (!data.items || data.items.length === 0) {
		throw new Error('Video not found');
	}

	const video = data.items[0];
	const title = video.snippet.title;
	const description = video.snippet.description;
	const author = video.snippet.channelTitle;
	const channelId = video.snippet.channelId;

	const transcript = await getTranscript(videoId);

	return { title, channelId, description, author, transcript };
};

const getVideoDataWithInnertube = async (videoId: string): Promise<VideoMeta> => {
	const innertubeConfig: any = {
		cache: new UniversalCache(false)
	};

	// Only use proxy if PROXY_URI is provided
	if (PROXY_URI) {
		const proxyAgent = new ProxyAgent(PROXY_URI);
		innertubeConfig.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
			return Platform.shim.fetch(input, { ...init, dispatcher: proxyAgent } as any)
		};
	}

	const innertube = await Innertube.create(innertubeConfig);

	const info = await innertube.getInfo(videoId);

	const title = info.basic_info.title as string;
	const author = info.basic_info.author as string;
	const channelId = info.basic_info.channel_id as string;
	const description = info.basic_info.short_description as string;

	const transcript = await getTranscript(videoId);

	return { title, channelId, description, author, transcript };
};

export const getVideoData = async (videoId: string): Promise<VideoMeta> => {
	try {
		// Try YouTube Data API first if API key is available
		if (YOUTUBE_DATA_API_KEY) {
			try {
				return await getVideoDataWithYouTubeAPI(videoId);
			} catch (error) {
				console.warn('YouTube Data API failed, falling back to Innertube:', error);
			}
		}

		// Fallback to Innertube
		return await getVideoDataWithInnertube(videoId);
	} catch (error) {
		console.error('Failed to get video data:', error);
		throw new Error(`Failed to get video data. ${error}`);
	}
};