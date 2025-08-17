<script lang="ts">
	import { timeAgo } from '$lib/utils.js';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import type { PageData } from './$types.js';

	interface RecentSummary {
		$id: string;
		title: string;
		videoId: string;
		$createdAt: string;
		hits?: number;
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

<div class="container mx-auto max-w-3xl px-4 py-8">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-semibold text-zinc-100">Recent Summaries</h1>
		<p class="text-zinc-400">The last 50 recently summarized YouTube videos</p>
	</div>

	<div class="space-y-6">
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

						<div class="flex flex-col text-sm text-zinc-500 sm:flex-row sm:items-center sm:gap-4">
							<div class="flex items-center gap-1">
								<ClockIcon class="h-4 w-4" />
								<span>{timeAgo(summary.$createdAt)}</span>
							</div>
							<div class="flex items-center gap-1">
								<EyeIcon class="h-4 w-4" />
								<span>{summary.hits ?? 1} hits</span>
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
</div>
