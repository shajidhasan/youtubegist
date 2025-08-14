import { FREE_TRANSCRIPT_ENDPOINT, PROXY_URI } from '$env/static/private';
import { ProxyAgent } from 'undici';
import { Innertube, Platform, UniversalCache } from 'youtubei.js';


const proxyAgent = new ProxyAgent(PROXY_URI);

export const getTranscript = async (videoId: string) => {
    try {
        // Try methodOne without proxy first
        return await methodOne(videoId, false);
    } catch (error) {
        console.warn('methodOne without proxy failed:', error);

        try {
            // Try methodOne with proxy
            return await methodOne(videoId, true);
        } catch (error) {
            console.warn('methodOne with proxy failed:', error);

            try {
                // Try methodTwo as last resort
                return await methodTwo(videoId);
            } catch (error) {
                console.error('All transcript methods failed:', error);
                throw new Error('Failed to get transcript using all available methods');
            }
        }
    }
}

const methodOne = async (videoId: string, useProxy = false) => {
    const options: Record<string, unknown> = {
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            langCode: "en"
        }),
        method: "POST",
    }

    if (useProxy) {
        options.dispatcher = proxyAgent;
    }

    const res = await fetch(FREE_TRANSCRIPT_ENDPOINT, options);
    const segments = await res.json() as { captions: { text: string }[] };
    const transcript = segments.captions.map(segment => segment.text).join("\n")

    return transcript;
}

const methodTwo = async (videoId: string) => {
    const innertube = await Innertube.create({
        fetch: (input: RequestInfo | URL, init?: RequestInit) => {
            const options: Record<string, unknown> = { ...init, dispatcher: proxyAgent };
            return Platform.shim.fetch(input, options)
        },
        cache: new UniversalCache(false)
    });

    const info = await innertube.getInfo(videoId);
    const transcriptInfo = await info.getTranscript();
    const transcript = transcriptInfo.transcript.content?.body?.initial_segments
        .map((segment) => segment.snippet.text)
        .join('\n') as string;

    return transcript;
}

