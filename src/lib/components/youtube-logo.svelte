<script lang="ts">
	import PlayIcon from '@lucide/svelte/icons/play';

	const { width = 'w-8' }: { width?: string } = $props();
</script>

<div class="flex aspect-[3/2] flex-col justify-center {width}">
	<div class="flex h-full w-full items-center justify-center rounded-[20%/30%] bg-red-500">
		<PlayIcon class="aspect-square h-[60%] translate-x-[2%] fill-white stroke-none" />
	</div>
</div>
