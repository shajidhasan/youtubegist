<script lang="ts">
	import { timeAgo } from '$lib/utils.js';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import VideoIcon from '@lucide/svelte/icons/video';
	import type { PageData } from './$types.js';

	interface RecentSummary {
		$id: string;
		title: string;
		videoId: string;
		$createdAt: string;
	}

	let { data }: { data: PageData } = $props();
	let summaries: RecentSummary[] = data.summaries;
</script>

<svelte:head>
	<title>Recent Summaries - youtubegist</title>
	<meta
		name="description"
		content="Browse the last 50 recently summarized YouTube videos on youtubegist."
	/>
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-semibold text-zinc-100">Recent Summaries</h1>
		<p class="text-zinc-400">The last 50 recently summarized YouTube videos</p>
	</div>

	{#if summaries.length === 0}
		<div class="rounded-lg border border-zinc-700 bg-zinc-800/30 p-8 text-center">
			<VideoIcon class="mx-auto mb-3 h-12 w-12 text-zinc-500" />
			<h3 class="mb-2 text-lg font-medium text-zinc-300">No summaries yet</h3>
			<p class="text-zinc-500">Be the first to summarize a YouTube video!</p>
			<a
				href="/"
				class="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				Get Started
			</a>
		</div>
	{:else}
		<div class="space-y-3">
			{#each summaries as summary (summary.$id)}
				<div
					class="group rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-4 transition-all duration-200 hover:border-zinc-600/50 hover:bg-zinc-800/50"
				>
					<div class="flex items-start gap-4">
						<!-- Video Thumbnail Placeholder -->
						<div class="flex-shrink-0">
							<img
								src="https://img.youtube.com/vi/{summary.videoId}/mqdefault.jpg"
								alt="Video thumbnail"
								class="h-16 w-24 rounded-md object-cover transition-transform duration-200 group-hover:scale-105"
								loading="lazy"
							/>
						</div>

						<!-- Content -->
						<div class="min-w-0 flex-1">
							<h3
								class="mb-2 line-clamp-2 text-lg font-medium text-zinc-100 transition-colors duration-200 group-hover:text-red-300"
							>
								<a href="/watch?v={summary.videoId}" class="hover:underline">
									{summary.title}
								</a>
							</h3>

							<div class="flex items-center gap-4 text-sm text-zinc-500">
								<div class="flex items-center gap-1">
									<ClockIcon class="h-4 w-4" />
									<span>{timeAgo(summary.$createdAt)}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer Info -->
		<div class="mt-8 text-center">
			<p class="text-sm text-zinc-500">
				Showing {summaries.length} recent summaries
			</p>
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
