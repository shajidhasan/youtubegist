<script lang="ts">
	import Logo from '$lib/components/shared/logo.svelte';
	import YoutubeIcon from '@lucide/svelte/icons/youtube';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import { goto } from '$app/navigation';
	import { extractVideoId } from '$lib/utils';

	let youtubeUrl = $state('');

	let isValidUrl = $derived(youtubeUrl.trim() !== '' && extractVideoId(youtubeUrl) !== null);

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const videoId = extractVideoId(youtubeUrl);
		if (videoId) {
			goto(`watch?v=${videoId}`);
		} else {
			alert('Please enter a valid YouTube URL');
		}
	};
</script>

<svelte:head>
	<title>youtubegist: YouTube Summaries for Everyone</title>
	<meta name="title" content="youtubegist: YouTube Summaries for Everyone" />
	<meta property="og:title" content="youtubegist: YouTube Summaries for Everyone" />
</svelte:head>

<main class="flex flex-col items-center justify-center px-4 pt-[10%] pb-8 xl:pt-30">
	<!-- Logo Section -->
	<div class="mb-12 text-center">
		<div class="mb-4 flex items-center justify-center gap-3">
			<Logo width="w-8" />
			<h1 class="font-mono text-4xl text-zinc-100">youtubegist</h1>
		</div>
		<p class="mx-auto max-w-md text-lg leading-relaxed">
			Transform any YouTube video into a concise summary in seconds
		</p>
	</div>

	<!-- Main Form -->
	<div class="w-full max-w-2xl">
		<form onsubmit={handleSubmit}>
			<!-- Combined URL Input and Submit Button -->
			<div class="group relative flex w-full items-center">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
					<YoutubeIcon class="h-5 w-5 text-zinc-500" />
				</div>
				<input
					type="url"
					bind:value={youtubeUrl}
					placeholder="Paste your YouTube URL here..."
					class="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-4 pr-18 pl-12 text-zinc-100 placeholder-zinc-500 transition-all duration-200 hover:border-zinc-600 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none md:pr-44"
				/>
				<button
					type="submit"
					disabled={!isValidUrl}
					class="group/button absolute inset-y-0 right-0 m-2 flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium tracking-tight text-zinc-100 transition-all duration-200 hover:scale-105 hover:bg-red-600 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-zinc-700"
				>
					<ZapIcon
						class="h-5 w-5 fill-transparent transition-all duration-300 group-hover/button:scale-110 group-hover/button:fill-white"
					/>
					<!-- Hide text on small screens for a compact look -->
					<span class="hidden md:inline">Get Summary</span>
				</button>
			</div>
		</form>
	</div>

	<!-- Pro Tip Section -->
	<div class="mt-8 w-full max-w-2xl">
		<div
			class="flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-zinc-800/50 p-4 transition-colors duration-200 hover:bg-zinc-800/70"
		>
			<div class="flex-shrink-0">
				<LightbulbIcon class="h-5 w-5 text-yellow-400" />
			</div>
			<p class="text-sm">
				For quick access, just add
				<code
					class="mx-0.5 rounded border border-zinc-600 bg-zinc-700 px-1.5 py-1 font-mono text-sm leading-loose font-medium whitespace-nowrap text-red-300"
					>gist</code
				>
				after "youtube" in any video URL.
			</p>
		</div>
	</div>

	<!-- Call to Action -->
	<div class="mt-12 space-y-2 text-center">
		<p class="text-sm text-zinc-500">Free to use • No account needed • Open-source</p>
	</div>
</main>
