<script lang="ts">
	import ZapIcon from '@lucide/svelte/icons/zap';
	import LinkIcon from '@lucide/svelte/icons/link';
	import SmartphoneIcon from '@lucide/svelte/icons/smartphone';
	import Share2Icon from '@lucide/svelte/icons/share-2';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';
</script>

<svelte:head>
	<title>youtubegist: Help</title>
	<meta name="title" content="youtubegist: Help" />
	<meta property="og:title" content="youtubegist: Help" />
</svelte:head>

<div class="flex flex-col items-center px-4 py-8 md:pt-8 md:pb-6">
	<div class="w-full max-w-3xl space-y-12">
		<!-- Hero Section -->
		<header class="space-y-4 text-center">
			<div class="flex justify-center">
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
					<HelpCircleIcon class="h-8 w-8 text-red-500" />
				</div>
			</div>
			<h1 class="text-xl font-medium text-zinc-100 md:text-2xl">
				Using <span class="font-mono">youtubegist</span>
			</h1>
		</header>

		<div class="space-y-12">
			<!-- Section 1: The gist Trick -->
			<section class="group flex items-start gap-4 md:gap-6">
				<div
					class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 transition-colors duration-200 group-hover:bg-red-500/20"
				>
					<LinkIcon class="h-6 w-6 text-red-500" />
				</div>
				<div class="space-y-3">
					<h2 class="text-xl font-medium text-zinc-100">The Shortcut</h2>
					<p class="leading-relaxed">
						The fastest way to get a summary on desktop. When you're on a YouTube video page, simply
						edit the URL in your browser's address bar.
					</p>
					<p class="">
						Just add <code
							class="mx-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-sm text-red-300"
							>gist</code
						>
						right after <span class="font-medium text-zinc-100">youtube</span> and press Enter.
					</p>

					<!-- Interactive URL Example -->
					<div class="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
						<div class="flex items-center justify-between gap-4">
							<div class="min-w-0 flex-1">
								<div class="mb-1 text-sm text-zinc-500">Before:</div>
								<code class="font-mono text-sm">youtube.com/watch?v=...</code>
								<div class="mt-3 mb-1 text-sm text-zinc-500">After:</div>
								<code class="font-mono text-sm text-zinc-100"
									>youtube<span class="font-bold text-red-400">gist</span>.com/watch?v=...</code
								>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Section 2: Mobile Usage -->
			<section class="group flex items-start gap-4 md:gap-6">
				<div
					class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 transition-colors duration-200 group-hover:bg-red-500/20"
				>
					<SmartphoneIcon class="h-6 w-6 text-red-500" />
				</div>
				<div class="space-y-4">
					<div>
						<h2 class="text-xl font-medium text-zinc-100">Mobile Experience</h2>
						<p class="mt-2 leading-relaxed">
							For the best mobile experience, install <span class="font-mono text-zinc-100"
								>youtubegist</span
							> as an app. This allows you to send videos directly from the YouTube app to get summaries.
						</p>
					</div>

					<div class="grid gap-4">
						<!-- Step 1: Install -->
						<div
							class="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4"
						>
							<div
								class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-300"
							>
								1
							</div>
							<div class="space-y-1">
								<h3 class="font-medium text-zinc-200">Install the App</h3>
								<p class="text-sm leading-relaxed">
									Open the website with Android Google Chrome, click on "Install" when prompted. Or
									tap your browser's menu (⋮) and select
									<span class="font-medium text-zinc-100">"Add to Home Screen"</span> or
									<span class="font-medium text-zinc-100">"Install App"</span>.
								</p>
							</div>
						</div>

						<!-- Step 2: Share -->
						<div
							class="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4"
						>
							<div
								class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-300"
							>
								2
							</div>
							<div class="space-y-1">
								<h3 class="font-medium text-zinc-200">Share from YouTube</h3>
								<p class="text-sm leading-relaxed">
									In the YouTube app, while watching a video, tap the
									<span class="inline-flex items-center gap-1 font-medium text-zinc-100">
										Share <Share2Icon class="h-3.5 w-3.5" />
									</span> button.
								</p>
							</div>
						</div>

						<!-- Step 3: Select -->
						<div
							class="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-4"
						>
							<div
								class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-sm font-medium text-red-300"
							>
								3
							</div>
							<div class="space-y-1">
								<h3 class="font-medium text-zinc-200">
									Choose <span class="font-mono text-zinc-100">youtubegist</span>
								</h3>
								<p class="text-sm leading-relaxed">
									Find and select <span class="font-medium text-zinc-100">youtubegist</span> from the
									share menu. The summary will be generated automatically.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Back to Home Link -->
		<div class="text-center">
			<a
				href="/"
				class="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-all duration-200 hover:scale-105 hover:bg-zinc-700 hover:text-zinc-100"
			>
				<ChevronLeftIcon class="h-4 w-4" />
				Back to Home
			</a>
		</div>
	</div>
</div>
