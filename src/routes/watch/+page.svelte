<script lang="ts">
	import { onMount } from 'svelte';
	import type { SummaryData } from '$lib/types';
	import { fetchWithNonce } from '$lib/client/nonce';
	import { goto } from '$app/navigation';
	import LanguagesIcon from '@lucide/svelte/icons/languages';

	import Tags from '$lib/components/summary/tags.svelte';
	import KeyTakeaway from '$lib/components/summary/key-takeway.svelte';
	import Divider from '$lib/components/shared/divider.svelte';
	import KeyPoints from '$lib/components/summary/key-points.svelte';
	import Summary from '$lib/components/summary/summary.svelte';
	import VideoInfo from '$lib/components/summary/video-info.svelte';
	import Skeletons from '$lib/components/summary/skeletons.svelte';
	import ErrorAndRefresh from '$lib/components/summary/error-and-refresh.svelte';
	import FloatingLoadingIndicator from '$lib/components/summary/floating-loading-indicator.svelte';

	const { data } = $props();

	let summaryData = $state<SummaryData | null>(data.summaryData);
	let error = $state<string | null>(null);
	let selectedLanguage = $state('en');

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'ru', name: 'Русский' },
		{ code: 'es', name: 'Español' },
		{ code: 'fr', name: 'Français' },
		{ code: 'de', name: 'Deutsch' },
		{ code: 'zh', name: '中文' },
		{ code: 'ja', name: '日本語' },
		{ code: 'ko', name: '한국어' }
	];

	let loading = $derived(!summaryData && !error);

	const handleLanguageChange = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const videoId = urlParams.get('v');
		if (videoId) {
			goto(`watch?v=${videoId}&lang=${selectedLanguage}`);
		}
	};

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const langParam = urlParams.get('lang');
		if (langParam) {
			selectedLanguage = langParam;
		}

		if (!summaryData) {
			const videoId = urlParams.get('v');
			if (!videoId) {
				error = 'No video ID found in the URL. Please make sure the URL is correct.';
				return;
			}

			const apiUrl = langParam 
				? `/api/get-summary?v=${videoId}&lang=${langParam}`
				: `/api/get-summary?v=${videoId}`;

			fetchWithNonce(apiUrl)
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
</script>

<svelte:head>
	{#if summaryData}
		<title>{summaryData.title} - youtubegist</title>
		<meta name="title" content={`${summaryData.title} - youtubegist`} />
		<meta name="og:title" content={`${summaryData.title} - youtubegist`} />
	{/if}
</svelte:head>

{#if loading}
	<FloatingLoadingIndicator />
	<Skeletons />
{:else if error}
	<ErrorAndRefresh {error} />
{:else if summaryData}
	<div class="container mx-auto max-w-3xl px-4 py-12">
		<!-- Language Selector -->
		<div class="mb-6 flex items-center justify-center gap-3">
			<div class="flex items-center gap-2 text-sm text-zinc-400">
				<LanguagesIcon class="h-4 w-4" />
				<span>Summary language:</span>
			</div>
			<select
				bind:value={selectedLanguage}
				onchange={handleLanguageChange}
				class="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition-all duration-200 hover:border-zinc-600 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
			>
				{#each languages as lang}
					<option value={lang.code}>{lang.name}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-8">
			<VideoInfo {summaryData} />

			<Tags {summaryData} />
			<Divider />
			<KeyTakeaway {summaryData} />
			<Divider />
			<KeyPoints {summaryData} />
			<Divider />
			<Summary {summaryData} />
		</div>
	</div>
{/if}
