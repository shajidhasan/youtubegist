<script lang="ts">
	const { width = 'w-8' }: { width: string } = $props();
</script>

<div class="{width} grid aspect-square grid-cols-2 gap-[20%]">
	<div class="rounded-full bg-red-500"></div>
	<div class="rounded-full bg-red-300"></div>
	<div class="rounded-full bg-red-300"></div>
	<div class="rounded-full bg-red-500"></div>
</div>
