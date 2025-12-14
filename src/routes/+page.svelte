<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import arctic from '$lib/assets/arctic_fox.jpg';
</script>

<svelte:head>
	<title>Hi, I am Aden!</title>
	<meta name="description" content="I play and make games. (and make YouTube videos)" />
</svelte:head>

<main class="m-auto flex max-w-7xl flex-col gap-4 p-10 md:grid md:grid-cols-10 md:grid-rows-10">
	<Card colSpan="col-span-6" rowSpan="row-span-2">
		<p>Hello, I'm Aden, a student from Hong Kong. I love playing games and making games!</p>
	</Card>
	<Card colSpan="col-span-4" rowSpan="row-span-4">
		<h2 class="text-2xl font-bold">About Me</h2>
		<p>
			I'm Aden Pun, a secondary school student from Hong Kong with a silly dream of making an indie
			hit game. I have been interested in programming since I was 9. I don't really know what to say
			here so I'm gonna leave it at that.
		</p>
	</Card>
	<Card colSpan="col-span-6" rowSpan="row-span-4">
		<h2 class="text-2xl font-bold">Contact me</h2>
		<ul class="list-disc pl-4">
			<li>
				<a href="mailto:adenpun2000@gmail.com">Email (adenpun2000@gmail.com)</a>
			</li>
			<li>
				<a href="https://twitter.com/PunAden">Twitter (@PunAden)</a>
			</li>
			<li>
				<a href="https://github.com/aappaapp">GitHub (aappaapp)</a>
			</li>
			<li>
				<a href="https://www.youtube.com/@adenpun">YouTube (@adenpun)</a>
			</li>
		</ul>
	</Card>
	<Card colSpan="col-span-4" rowSpan="row-span-4">
		<h2 class="text-2xl font-bold">Projects</h2>
		<ul class="list-disc pl-4">
			<li>
				<a href="https://github.com/aappaapp/website">This website</a>
			</li>
			<li>
				<a href="https://mafia.adeen.link/">A Werewolf dashboard (WIP)</a>
			</li>
			<li>More coming soon...</li>
		</ul>
	</Card>
	<Card colSpan="col-span-3" rowSpan="row-span-4" class="relative hidden md:block">
		<h2 class="text-2xl font-bold">Aww...</h2>
		<img
			src={arctic}
			alt="An arctic fox sleeping."
			class="absolute inset-0 -z-50 min-h-full min-w-full object-cover opacity-75"
		/>
	</Card>
	<Card colSpan="col-span-3" rowSpan="row-span-4" href="/blog">
		<h2 class="inline-block text-2xl font-bold">Blog</h2>
		<p>Coming soon... maybe</p>
	</Card>
	<Card colSpan="col-span-4" rowSpan="row-span-2">
		<p>
			Proudly built with Astro. Heavily inspired by <a
				href="https://gianmarcocavallo.com/"
				target="_blank">gianmarcocavallo.com</a
			>. Copyright &copy; 2025 Aden Pun. All rights reserved.
		</p>
	</Card>
</main>
