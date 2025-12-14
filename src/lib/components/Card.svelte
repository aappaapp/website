<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		colSpan: string;
		rowSpan: string;
		class?: string;
		href?: string;
		children?: Snippet;
	};

	let { colSpan, rowSpan, href, children, ...rest }: Props = $props();
</script>

<div
	class="block overflow-hidden rounded-2xl border-2 border-neutral-400 p-7 shadow-white transition duration-100 hover:border-neutral-200 hover:shadow-sm {colSpan} {rowSpan} {rest.class}"
>
	{#if href}
		<a {href} class="block h-full w-full">
			{@render children?.()}
		</a>
	{:else}
		{@render children?.()}
	{/if}
</div>
