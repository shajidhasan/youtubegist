<script lang="ts">
	import BookOpenIcon from '@lucide/svelte/icons/book-open';

	import type { SummaryData } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Divider from '$lib/components/shared/divider.svelte';

	let { summaryData }: { summaryData: SummaryData } = $props();

	let overflowChecked = $state(false);
	let showAllTags = $state(false);
	let tagsOverflowingOrWrapping = $state(false);
	let tagsContainer = $state<HTMLDivElement>();

	const checkTagsOverflow = () => {
		overflowChecked = true;

		if (tagsContainer) {
			const firstRow = tagsContainer.firstElementChild as HTMLElement | null;
			const firstRowHeight = firstRow?.offsetHeight ?? 0;
			const totalHeight = (tagsContainer as HTMLElement).offsetHeight;

			tagsOverflowingOrWrapping =
				tagsContainer.scrollWidth > tagsContainer.clientWidth || totalHeight > firstRowHeight;
		}
	};

	onMount(() => {
		checkTagsOverflow();
	});
</script>

<svelte:window onresize={checkTagsOverflow} />

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<div class="rounded-full bg-purple-500/10 p-1">
				<BookOpenIcon class="h-4 w-4 text-purple-400" />
			</div>
			<h2 class="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Tags</h2>
		</div>
		{#if tagsOverflowingOrWrapping && overflowChecked}
			<button
				transition:fade={{ duration: 300 }}
				aria-label={showAllTags ? 'Show less' : 'Show all'}
				onclick={() => (showAllTags = !showAllTags)}
				class="text-xs font-medium text-purple-400 transition-colors duration-200 hover:text-purple-300"
			>
				{showAllTags ? 'Show less' : 'Show all'}
			</button>
		{/if}
	</div>
	<div class="relative">
		<div
			bind:this={tagsContainer}
			class="{showAllTags ? 'flex flex-wrap' : 'flex overflow-hidden'} gap-2"
		>
			{#each summaryData.coreTerms as term}
				<span
					class="inline-flex flex-shrink-0 items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm"
				>
					{term}
				</span>
			{/each}
		</div>
		{#if !overflowChecked || (!showAllTags && tagsOverflowingOrWrapping)}
			<div
				class="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-zinc-900 to-transparent"
			></div>
		{/if}
	</div>
</div>
