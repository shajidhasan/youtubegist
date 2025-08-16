<script lang="ts">
	import type { SummaryData, VideoMeta } from '$lib/types';
	import YoutubeLogo from '$lib/components/shared/youtube-logo.svelte';
	import LinkIcon from '@lucide/svelte/icons/link';
	import ShareIcon from '@lucide/svelte/icons/share';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { tick } from 'svelte';

	let { summaryData }: { summaryData: SummaryData } = $props();

	let copied = $state(false);
	let videoUrl = $derived(`https://www.youtubegist.com/watch?v=${summaryData?.videoId}`);

	let videoMeta = $derived.by(() => {
		if (!summaryData) return { author: 'Unknown', channelId: '', channelAvatarUrl: '' };
		try {
			return JSON.parse(summaryData.meta) as VideoMeta;
		} catch (e) {
			console.error('Failed to parse videoMeta:', e);
			return { author: 'Unknown', channelId: '', channelAvatarUrl: '' };
		}
	});

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(videoUrl);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy link: ', err);
			alert('Failed to copy link.');
		}
	};

	const shareContent = async () => {
		if (!summaryData) return;
		const shareData = {
			title: summaryData.title,
			text: `Check out this summary for "${summaryData.title}"`,
			url: videoUrl
		};
		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await copyLink();
				await tick();
				if (copied) {
					alert('Link copied to clipboard! You can now share it.');
				}
			}
		} catch (err) {
			console.error('Sharing failed:', err);
		}
	};
</script>

<div class="relative w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
	<img
		src="https://i.ytimg.com/vi/{summaryData.videoId}/0.jpg"
		alt="Thumbnail for {summaryData.title}"
		class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
		loading="lazy"
	/>
	<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"></div>

	<div class="relative flex h-full min-h-[320px] flex-col justify-between p-6 sm:p-8">
		<div>
			{#if videoMeta.channelId}
				<a
					href="https://www.youtube.com/channel/{videoMeta.channelId}"
					target="_blank"
					rel="noopener noreferrer"
					class="group/channel inline-flex items-center gap-3 rounded-xl bg-black/40 px-4 py-3 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all duration-200 hover:bg-black/60 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-white/80"
				>
					<span class="transition-colors duration-200">{videoMeta.author}</span>
				</a>
			{/if}
		</div>

		<div class="space-y-6">
			<h1 class="text-3xl tracking-tight text-balance text-zinc-100 drop-shadow-lg sm:text-4xl">
				{summaryData.title}
			</h1>

			<div class="flex flex-wrap items-center gap-3">
				<a
					href="https://www.youtube.com/watch?v={summaryData.videoId}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2.5 rounded-lg bg-white px-2 py-2 text-sm text-black shadow-lg transition-transform hover:bg-zinc-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<YoutubeLogo />
					<span>Watch on YouTube</span>
				</a>

				<button
					onclick={copyLink}
					aria-label="Copy Link"
					class="group/copy rounded-full border border-white/20 bg-white/10 p-2 text-zinc-100 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus-visible:outline-white"
				>
					{#if copied}
						<CheckIcon class="h-5 w-5 text-green-400" />
					{:else}
						<LinkIcon
							class="h-5 w-5 transition-transform duration-200 group-hover/copy:rotate-12"
						/>
					{/if}
				</button>

				<button
					onclick={shareContent}
					aria-label="Share"
					class="group/share rounded-full border border-white/20 bg-white/10 p-2 text-zinc-100 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 focus-visible:outline-white"
				>
					<ShareIcon
						class="h-5 w-5 transition-transform duration-200 group-hover/share:rotate-12"
					/>
				</button>
			</div>
		</div>
	</div>
</div>
