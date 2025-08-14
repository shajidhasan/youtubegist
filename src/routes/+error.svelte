<script lang="ts">
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';

	import { page } from '$app/state';

	// Specific messages for common HTTP status codes
	const messages: Record<number, string> = {
		400: 'The server could not understand the request due to invalid syntax.',
		401: 'Authentication is required to access this resource. Please log in.',
		403: 'You do not have permission to access this page.',
		404: "The resource you're looking for could not be found.",
		500: "Something went wrong on our end. We're looking into it.",
		503: 'The service is temporarily unavailable. Please try again later.'
	};

	// A generic fallback message for any other error code
	const genericMessage = 'An unexpected error occurred.';
</script>

<div
	class="container mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center"
>
	<div class="rounded-full bg-red-500/10 p-4">
		<AlertTriangleIcon class="h-16 w-16 text-red-500" />
	</div>
	<div class="space-y-4">
		<h1 class="text-4xl font-light tracking-tight text-zinc-100">{page.status} Error</h1>
		<p class="max-w-md leading-relaxed">
			<!-- Show the specific message, SvelteKit's error message, or the generic one -->
			{messages[page.status] || page.error?.message || genericMessage}
		</p>
	</div>

	<!-- Back to Home Link -->
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
