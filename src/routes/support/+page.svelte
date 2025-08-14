<script lang="ts">
	import HeartIcon from '@lucide/svelte/icons/heart';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import CoffeeIcon from '@lucide/svelte/icons/coffee';
	import StarIcon from '@lucide/svelte/icons/star';
</script>

<svelte:head>
	<title>youtubegist: Support the Project</title>
	<meta name="title" content="youtubegist: Support the Project" />
	<meta property="og:title" content="youtubegist: Support the Project" />
</svelte:head>

<div class="flex flex-col items-center px-4 py-8">
	<div class="w-full max-w-2xl space-y-8">
		<!-- Header -->
		<header class="space-y-4 text-center">
			<div class="flex justify-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
					<HeartIcon class="h-6 w-6 text-red-500" />
				</div>
			</div>
			<h1 class="text-2xl font-medium text-zinc-100">
				Support <span class="font-mono">youtubegist</span>
			</h1>
			<p class="mx-auto max-w-lg text-zinc-400">
				Help keep <span class="font-mono text-zinc-100">youtubegist</span> free and accessible by supporting
				development and server costs.
			</p>
		</header>

		<!-- Support Options -->
		<div class="grid gap-4 md:grid-cols-2">
			<!-- One-time Donation -->
			<div class="flex flex-col rounded-lg border border-zinc-700 bg-zinc-900/50 p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
						<CoffeeIcon class="h-5 w-5 text-amber-500" />
					</div>
					<h3 class="text-lg font-medium text-zinc-100">One-time Donation</h3>
				</div>
				<p class="mb-auto text-sm text-zinc-400">
					Support the project with a one-time contribution to help cover server costs and
					development.
				</p>
				<div class="mt-4">
					<a
						href="https://www.buymeacoffee.com/sh4jid"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-amber-700"
					>
						<CoffeeIcon class="h-4 w-4" />
						Buy Me a Coffee
					</a>
				</div>
			</div>

			<!-- Sponsorship -->
			<div class="flex flex-col rounded-lg border border-zinc-700 bg-zinc-900/50 p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
						<StarIcon class="h-5 w-5 text-purple-500" />
					</div>
					<h3 class="text-lg font-medium text-zinc-100">Sponsorship</h3>
				</div>
				<div class="flex-1">
					<p class="mb-2 text-sm text-zinc-400">
						Recurring support with additional benefits and recognition.
					</p>
					<ul class="space-y-1 text-xs text-zinc-500">
						<li>• Logo placement on homepage</li>
						<li>• Logo in GitHub repository</li>
					</ul>
				</div>
				<div class="mt-4">
					<a
						href="https://buymeacoffee.com/sh4jid/membership"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-purple-700"
					>
						<StarIcon class="h-4 w-4" />
						Become a Sponsor
					</a>
				</div>
			</div>
		</div>

		<!-- Back Link -->
		<div class="pt-4 text-center">
			<a
				href="/"
				class="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
			>
				<ChevronLeftIcon class="h-4 w-4" />
				Back to Home
			</a>
		</div>
	</div>
</div>
