<script lang="ts">
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import type { SummaryData } from '$lib/types';
	import { marked } from 'marked';

	let { summaryData }: { summaryData: SummaryData } = $props();

	let summaryHtml = $derived(summaryData ? marked.parse(summaryData.summary) : '');
</script>

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
		<div class="prose prose-lg prose-invert prose-zinc max-w-none leading-relaxed text-zinc-300">
			{@html summaryHtml}
		</div>
	</div>
</div>
