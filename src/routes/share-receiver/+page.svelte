<script lang="ts">
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
</script>

<div
	class="container mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center"
>
	<div class="rounded-full bg-red-500/10 p-4">
		<AlertTriangleIcon class="h-16 w-16 text-red-500" />
	</div>
	<div class="space-y-4">
		<h1 class="text-2xl font-light tracking-tight text-zinc-100">Something went wrong</h1>
		<p class="max-w-md leading-relaxed">Looks like the URL is not a valid YouTube video URL.</p>
	</div>

	<div class="text-center">
		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:scale-105 hover:bg-zinc-700 hover:text-zinc-100"
		>
			<ChevronLeftIcon class="h-4 w-4" />
			Back to Home
		</a>
	</div>
</div>
