<script lang="ts">
	import { browser } from '$app/environment';
	import Pie from '$lib/components/Pie.svelte';

	let nameList: string[] = $state(['']);
	if (browser) {
		nameList = JSON.parse(localStorage.getItem('ss-nl') ?? '[""]');
	}

	$effect(() => {
		if (nameList[nameList.length - 1] !== '') {
			nameList.push('');
		}
		localStorage.setItem('ss-nl', JSON.stringify(nameList));
	});

	function shuffleArray<T>(array: T[]): T[] {
		const nameList = [...array];
		for (let i = nameList.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[nameList[i], nameList[j]] = [nameList[j], nameList[i]];
		}
		return nameList;
	}
	let shuffled: string[] | null = $state(null);
	let index = $state(-1);

	let pie: ReturnType<typeof Pie> | null = $state(null);
</script>

<ul class="ml-5 list-disc">
	{#each nameList as name, i}
		<li class="first:[&>input]:rounded-t last:[&>input]:rounded-b">
			<input
				type="text"
				bind:value={nameList[i]}
				class=" bg-white px-5 py-2 text-black"
				onfocusout={() => {
					if (nameList.reduce((p, c) => p + Number(c === ''), 0))
						nameList = nameList.filter((v, i, a) => v !== '' || i == a.length - 1);
				}}
			/>
		</li>
	{/each}
</ul>

<button onclick={() => (shuffled = shuffleArray(nameList.slice(0, -1)))}>Shuffle!</button>

{#if shuffled}
	{shuffled[index + 1]} 👉🏻
	<button
		onclick={() => {
			index++;
			pie?.spin();
		}}>Spin</button
	>
	<Pie
		animated
		target={nameList.indexOf(shuffled[index - 1 == shuffled.length ? 0 : index + 1])}
		array={nameList.slice(0, -1).map((v) => ({ text: v }))}
		bind:this={pie}
	></Pie>
{/if}
