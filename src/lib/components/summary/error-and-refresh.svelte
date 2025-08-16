<script lang="ts">
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';

	let { error }: { error: string } = $props();

	const refreshPage = () => {
		window.location.reload();
	};
</script>

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
