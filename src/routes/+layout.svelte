<script lang="ts">
	import '@fontsource/space-mono';
	import '../app.css';

	import { navigating } from '$app/state';

	import Navbar from '$lib/components/layout/navbar.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	NProgress.configure({ showSpinner: false });

	let { children } = $props();

	$effect(() => {
		if (navigating.from !== null) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	});
</script>

<svelte:head>
	<title>youtubegist: Quick Summaries of YouTube Videos</title>
	<meta name="title" content="youtubegist: Quick Summaries of YouTube Videos" />
	<meta
		name="description"
		content="youtubegist generates quick summaries of YouTube videos, great for getting a high-level understanding of lectures, podcasts, or news reports without watching the entire video."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="youtubegist: Quick Summaries of YouTube Videos" />
	<meta
		property="og:description"
		content="youtubegist generates quick summaries of YouTube videos, great for getting a high-level understanding of lectures, podcasts, or news reports without watching the entire video."
	/>
	<meta property="og:url" content="https://youtubegist.com" />
	<meta property="og:image" content="/youtubegist.jpg" />
	<meta property="og:site_name" content="youtubegist" />
</svelte:head>

<Navbar />

<main class="min-h-[calc(100vh-242px)]">
	{@render children()}
</main>

<Footer />
