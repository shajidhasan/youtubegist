<script lang="ts">
	// Svelte and library imports
	import { marked } from 'marked';
	import { onMount, tick } from 'svelte';

	// Icon imports
	import LinkIcon from '@lucide/svelte/icons/link';
	import ShareIcon from '@lucide/svelte/icons/share';
	import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
	import CheckIcon from '@lucide/svelte/icons/check';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import LoaderIcon from '@lucide/svelte/icons/loader';

	import YoutubeLogo from '$lib/components/youtube-logo.svelte';

	// Type definitions
	import type { SummaryData, VideoMeta } from '$lib/types';

	// Props
	const { data } = $props();

	// Component State
	let summaryData = $state<SummaryData | null>(data.summaryData);
	let error = $state<string | null>(null);
	let copied = $state(false);

	// Derived state: loading is true only when we don't have data AND we don't have an error.
	let loading = $derived(!summaryData && !error);

	// Fetch summary on component mount if not passed via props
	onMount(() => {
		if (!summaryData) {
			const videoId = new URLSearchParams(window.location.search).get('v');
			if (!videoId) {
				error = 'No video ID found in the URL. Please make sure the URL is correct.';
				return;
			}

			fetch(`/api/get-summary?v=${videoId}`)
				.then(async (res) => {
					if (!res.ok) {
						// Try to get a more specific error message from the API response
						const errorText = (await res.json().catch(() => res.text()))?.error;
						throw new Error(
							errorText || `The server responded with status ${res.status}. Please try again.`
						);
					}
					return res.json();
				})
				.then((data: SummaryData) => {
					summaryData = data;
					error = null; // Clear previous errors on success
				})
				.catch((err: Error) => {
					console.error('Failed to fetch summary:', err);
					error =
						err.message ||
						'An unknown error occurred. The video might be private or the summary could not be generated.';
				});
		}
	});

	// Derived values for the template
	let videoMeta = $derived.by(() => {
		if (!summaryData) return { author: 'Unknown', channelId: '', channelAvatarUrl: '' };
		try {
			return JSON.parse(summaryData.meta) as VideoMeta;
		} catch (e) {
			console.error('Failed to parse videoMeta:', e);
			return { author: 'Unknown', channelId: '', channelAvatarUrl: '' };
		}
	});

	let keyTakeawayHtml = $derived(summaryData ? marked.parse(summaryData.keyTakeaway) : '');
	let pointsHtml = $derived(
		summaryData ? summaryData.keyPoints.map((point) => marked.parse(point)) : []
	);
	let summaryHtml = $derived(summaryData ? marked.parse(summaryData.summary) : '');
	let videoUrl = $derived(`https://www.youtubegist.com/watch?v=${summaryData?.videoId}`);

	// Component Methods
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

	const refreshPage = () => {
		window.location.reload();
	};
</script>

<svelte:head>
	{#if summaryData}
		<title>{summaryData.title} - youtubegist</title>
		<meta name="title" content={`${summaryData.title} - youtubegist`} />
		<meta name="og:title" content={`${summaryData.title} - youtubegist`} />
	{/if}
</svelte:head>

<!-- Floating Loading Indicator -->
{#if loading}
	<div class="fixed right-6 bottom-12 left-6 z-50 sm:bottom-6 sm:left-auto">
		<div
			class="flex items-center gap-3 rounded-full border border-zinc-700/50 bg-zinc-900/95 px-6 py-4 shadow-2xl backdrop-blur-sm"
		>
			<LoaderIcon class="h-5 w-5 animate-spin text-yellow-500" />
			<div class="text-sm">
				<div class="font-medium text-zinc-100">Generating summary...</div>
				<div class="text-zinc-400">This might take 15-20 seconds</div>
			</div>
		</div>
	</div>
{/if}

{#if loading}
	<div class="container mx-auto max-w-3xl animate-pulse px-4 py-12">
		<div class="space-y-8">
			<!-- Enhanced Thumbnail & Header Skeleton -->
			<div
				class="relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-[300px]"
			>
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
				></div>
				<div class="absolute bottom-6 left-6 space-y-4 sm:bottom-8 sm:left-8">
					<!-- Avatar Skeleton -->
					<div class="flex items-center gap-3">
						<div class="h-8 w-8 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
						<div class="h-5 w-24 rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
					</div>
					<!-- Title Skeleton -->
					<div class="space-y-3">
						<div class="h-7 w-80 max-w-full rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
						<div class="h-7 w-64 max-w-full rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
					</div>
					<!-- Buttons Skeleton -->
					<div class="flex items-center gap-3 pt-2">
						<div class="h-10 w-40 rounded-lg bg-zinc-700/80 backdrop-blur-sm"></div>
						<div class="h-10 w-10 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
						<div class="h-10 w-10 rounded-full bg-zinc-700/80 backdrop-blur-sm"></div>
					</div>
				</div>
			</div>

			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Key Takeaway Skeleton -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
					<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
				</div>
				<div class="rounded-lg bg-zinc-900/50 p-6">
					<div class="h-6 w-full rounded-lg bg-zinc-700"></div>
					<div class="mt-2 h-6 w-3/4 rounded-lg bg-zinc-700"></div>
				</div>
			</div>

			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Key Points Skeleton -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
					<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
				</div>
				<div class="space-y-4">
					{#each { length: 3 } as _}
						<div class="flex items-start gap-3 rounded-lg bg-zinc-900/50 p-4">
							<div class="h-5 w-5 flex-shrink-0 rounded-full bg-zinc-700"></div>
							<div class="flex-1 space-y-2">
								<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
								<div class="h-4 w-3/4 rounded-lg bg-zinc-700"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Core Terms Skeleton -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
					<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
				</div>
				<div class="flex flex-wrap gap-3">
					{#each { length: 5 } as _}
						<div class="h-8 w-20 rounded-full bg-zinc-700"></div>
					{/each}
				</div>
			</div>

			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Summary Skeleton -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-full bg-zinc-800"></div>
					<div class="h-4 w-32 rounded-lg bg-zinc-800"></div>
				</div>
				<div class="space-y-4 rounded-lg bg-zinc-900/50 p-6">
					<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
					<div class="h-4 w-full rounded-lg bg-zinc-700"></div>
					<div class="h-4 w-11/12 rounded-lg bg-zinc-700"></div>
					<div class="h-4 w-4/5 rounded-lg bg-zinc-700"></div>
				</div>
			</div>
		</div>
	</div>
{:else if error}
	<div
		class="container mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center"
	>
		<div class="rounded-full bg-red-500/10 p-4">
			<AlertTriangleIcon class="h-16 w-16 text-red-500" />
		</div>
		<div class="space-y-4">
			<h1 class="text-2xl font-light tracking-tight text-zinc-100">Something went wrong</h1>
			<p class="max-w-md leading-relaxed">
				{error}
			</p>
			<div class="max-w-lg space-y-3 text-sm text-zinc-400">
				<p class="font-medium">This might be because:</p>
				<ul class="space-y-1 text-left">
					<li>• The video does not have closed captions</li>
					<li>• YouTube is blocking our server for data processing</li>
					<li>• Something else unexpected happened</li>
				</ul>
			</div>
		</div>
		<button
			onclick={refreshPage}
			class="group inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-100 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
		>
			<RefreshCcwIcon class="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
			<span>Try Again</span>
		</button>
	</div>

	<!-- Enhanced Content Loaded State -->
{:else if summaryData}
	<div class="container mx-auto max-w-3xl px-4 py-12">
		<div class="space-y-8">
			<!-- Enhanced Hero Section -->
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
						<h1
							class="text-3xl tracking-tight text-balance text-zinc-100 drop-shadow-lg sm:text-4xl"
						>
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

			<!-- Elegant Divider -->
			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Key Takeaway Section -->
			{#if summaryData.keyTakeaway}
				<div class="space-y-6">
					<div class="flex items-center gap-2">
						<div class="rounded-full bg-blue-500/10 p-1">
							<SparklesIcon class="h-5 w-5 fill-blue-400 text-blue-400" />
						</div>
						<h2 class="text-sm font-semibold tracking-wider uppercase">Key Takeaway</h2>
					</div>
					<div
						class="rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 p-6 shadow-lg"
					>
						<blockquote class="text-xl leading-relaxed font-light text-blue-50">
							{@html keyTakeawayHtml}
						</blockquote>
					</div>
				</div>

				<!-- Elegant Divider -->
				<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
			{/if}

			<!-- Enhanced Key Points -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="rounded-full bg-red-500/10 p-1">
						<SparklesIcon class="h-5 w-5 fill-yellow-500 text-yellow-500" />
					</div>
					<h2 class="text-sm font-semibold tracking-wider uppercase">Key Points</h2>
				</div>
				<div class="space-y-4">
					{#each pointsHtml as point, i (i)}
						<div
							class="group/point rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-5 transition-all duration-200 hover:bg-zinc-900/70 hover:shadow-lg"
						>
							<div class="flex items-start gap-4">
								<div class="mt-1 rounded-full bg-red-500/10 p-1">
									<CheckCircle2Icon
										class="h-5 w-5 text-yellow-500 transition-transform duration-200 group-hover/point:scale-110"
									/>
								</div>
								<div
									class="translate-y-1 text-lg leading-relaxed text-zinc-300 [&>p>strong]:font-medium [&>p>strong]:text-zinc-100"
								>
									{@html point}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Elegant Divider -->
			<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

			<!-- Enhanced Full Summary -->
			<div class="space-y-6">
				<div class="flex items-center gap-2">
					<div class="rounded-full bg-emerald-500/10 p-1">
						<BookOpenIcon class="h-5 w-5 text-emerald-400" />
					</div>
					<h2 class="text-sm font-semibold tracking-wider uppercase">Summary</h2>
				</div>
				<div
					class="rounded-lg border border-zinc-800/50 bg-zinc-900/50 p-6 transition-all duration-200 hover:bg-zinc-900/70"
				>
					<div
						class="prose prose-lg prose-invert prose-zinc max-w-none leading-relaxed text-zinc-300"
					>
						{@html summaryHtml}
					</div>
				</div>
			</div>

			<!-- Core Terms Section -->
			{#if summaryData.coreTerms && summaryData.coreTerms.length > 0}
				<!-- Elegant Divider -->
				<div class="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

				<div class="space-y-6">
					<div class="flex items-center gap-2">
						<div class="rounded-full bg-purple-500/10 p-1">
							<BookOpenIcon class="h-5 w-5 text-purple-400" />
						</div>
						<h2 class="text-sm font-semibold tracking-wider uppercase">Core Terms/Concepts</h2>
					</div>
					<div class="flex flex-wrap gap-3">
						{#each summaryData.coreTerms as term}
							<span
								class="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/20 hover:text-purple-100"
							>
								{term}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
