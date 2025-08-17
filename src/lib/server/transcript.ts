import { FREE_TRANSCRIPT_ENDPOINT, PROXY_URI } from '$env/static/private';
import { ProxyAgent } from 'undici';
import { Innertube, Platform, UniversalCache } from 'youtubei.js';


// Only create proxy agent if PROXY_URI is available
const proxyAgent = PROXY_URI ? new ProxyAgent(PROXY_URI) : null;

export const getTranscript = async (videoId: string) => {
    // If FREE_TRANSCRIPT_ENDPOINT is not available, go straight to methodTwo
    if (!FREE_TRANSCRIPT_ENDPOINT) {
        console.log('FREE_TRANSCRIPT_ENDPOINT not available, using methodTwo');
        try {
            return await methodTwo(videoId);
        } catch (error) {
            console.error('methodTwo failed:', error);
            throw new Error('Failed to get transcript: FREE_TRANSCRIPT_ENDPOINT not configured and methodTwo failed');
        }
    }

    // FREE_TRANSCRIPT_ENDPOINT is available, try methodOne first
    try {
        // Try methodOne without proxy first
        return await methodOne(videoId, false);
    } catch (error) {
        console.warn('methodOne without proxy failed:', error);

        // Only try with proxy if PROXY_URI is available
        if (proxyAgent) {
            try {
                // Try methodOne with proxy
                return await methodOne(videoId, true);
            } catch (error) {
                console.warn('methodOne with proxy failed:', error);
            }
        }

        // Try methodTwo as last resort
        try {
            return await methodTwo(videoId);
        } catch (error) {
            console.error('All transcript methods failed:', error);
            throw new Error('Failed to get transcript using all available methods');
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

    if (useProxy && proxyAgent) {
        options.dispatcher = proxyAgent;
    }

    const res = await fetch(FREE_TRANSCRIPT_ENDPOINT, options);
    const segments = await res.json() as { captions: { text: string }[] };
    const transcript = segments.captions.map(segment => segment.text).join("\n")

    return transcript;
}

const methodTwo = async (videoId: string) => {
    const innertubeOptions: any = {
        cache: new UniversalCache(false)
    };

    // Only use proxy if proxyAgent is available
    if (proxyAgent) {
        innertubeOptions.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
            const options: Record<string, unknown> = { ...init, dispatcher: proxyAgent };
            return Platform.shim.fetch(input, options)
        };
    }

    const innertube = await Innertube.create(innertubeOptions);

    const info = await innertube.getInfo(videoId);
    const transcriptInfo = await info.getTranscript();
    const transcript = transcriptInfo.transcript.content?.body?.initial_segments
        .map((segment) => segment.snippet.text)
        .join('\n') as string;

    return transcript;
}

