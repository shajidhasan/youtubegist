<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';
	import GithubIcon from '@lucide/svelte/icons/github';
	import { page } from '$app/state';

	// Helper function to determine if a route is active
	function isActiveRoute(route: string): boolean {
		return page.url.pathname === route;
	}
</script>

<header class="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-lg">
	<nav class="container mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
		<!-- Logo Section -->
		<a
			href="/"
			class="group flex items-center gap-2 transition-all duration-200 hover:scale-105"
			aria-label="Homepage"
		>
			<div class="transition-transform duration-200 group-hover:rotate-6">
				<Logo width="w-5" />
			</div>
			<span
				class="hidden font-mono text-sm font-medium text-zinc-100 transition-colors duration-200 group-hover:text-red-300 sm:block"
			>
				youtubegist
			</span>
		</a>

		<!-- Navigation Links -->
		<div class="flex items-center gap-2">
			<a
				href="/help"
				class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-zinc-800/50 {isActiveRoute(
					'/help'
				)
					? 'bg-zinc-800/70 text-zinc-100'
					: 'text-zinc-300 hover:text-zinc-100'}"
			>
				<HelpCircleIcon
					class="h-4 w-4 transition-colors duration-200 group-hover:text-blue-500 {isActiveRoute(
						'/help'
					)
						? 'text-blue-500'
						: 'fill-transparent'}"
				/>
				Help
			</a>

			<a
				href="/support"
				class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-red-500/10 {isActiveRoute(
					'/support'
				)
					? 'bg-red-500/20 text-red-300'
					: 'text-zinc-300 hover:text-red-300'}"
			>
				<HeartIcon
					class="h-4 w-4 transition-colors duration-200 group-hover:fill-red-500 group-hover:text-red-500 {isActiveRoute(
						'/support'
					)
						? 'fill-red-500 text-red-500'
						: 'fill-transparent'}"
				/>
				Support
			</a>

			<a
				href="https://github.com/shajidhasan/youtubegist"
				target="_blank"
				title="GitHub link"
				rel="noopener noreferrer"
				class="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-white/10"
			>
				<GithubIcon class="h-4 w-4 transition-colors duration-200 group-hover:text-zinc-100" />
			</a>
		</div>
	</nav>
</header>
