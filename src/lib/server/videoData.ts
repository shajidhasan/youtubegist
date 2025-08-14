import { YOUTUBE_DATA_API_KEY } from "$env/static/private";
import type { VideoMeta } from "$lib/types";
import { getTranscript } from "./transcript";

export const getVideoData = async (videoId: string): Promise<VideoMeta> => {
	try {
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

		const transcript = await getTranscript(videoId)

		return { title, channelId, description, author, transcript };
	} catch (error) {
		throw new Error(`Failed to get video data. ${error}`);
	}
};