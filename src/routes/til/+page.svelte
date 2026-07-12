<script lang="ts">
	const list: {
		text: string;
		date: string;
	}[] = [
		{
			text: 'Blue whales (and other cetaceans like dolphins) are evolved from some kind of mouse deer-like amimals many many years ago.',
			date: '2026-07-11'
		},
		{
			text: 'Dolphins are whales.',
			date: '2026-07-11'
		},
		{
			text: 'I share only 3.125% of DNA with my 2nd cousins.',
			date: '2026-07-12'
		},
		{
			text: 'Whales are actually closely related to hippos.',
			date: '2026-07-12'
		}
	];
</script>

<h1 class="text-xl font-bold">List of things that I've learnt</h1>
<ul>
	{#each list.toReversed() as item (item.text)}
		<li class="border px-3 py-2">{item.date}: {item.text}</li>
	{/each}
</ul>
