<script lang="ts">
	import LoaderIcon from '@lucide/svelte/icons/loader';
</script>

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
