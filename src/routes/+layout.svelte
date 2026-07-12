<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	const pageData = page.data.page ?? {};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title
		>{pageData.title
			? pageData.title + (!page.data.title_suffix ? ' | adenpun.net' : '')
			: 'adenpun.net'}</title
	>
	<meta name="description" content={pageData.description ?? 'Personal website of Aden Pun.'} />
</svelte:head>

{@render children()}
