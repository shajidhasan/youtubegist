<script lang="ts">
	import { onMount } from 'svelte';
	import type { SummaryData } from '$lib/types';
	import { fetchWithNonce } from '$lib/client/nonce';

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

	let loading = $derived(!summaryData && !error);

	onMount(() => {
		if (!summaryData) {
			const videoId = new URLSearchParams(window.location.search).get('v');
			if (!videoId) {
				error = 'No video ID found in the URL. Please make sure the URL is correct.';
				return;
			}

			fetchWithNonce(`/api/get-summary?v=${videoId}`)
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
