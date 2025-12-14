<script lang="ts">
	type Props = {
		animated?: boolean;
		target?: number;
		array: {
			text: string;
			color?: string;
		}[];
	};
	let { array, animated, target = 0 }: Props = $props();

	// #region Trigo
	let n = $derived(array.length);
	let unit = $derived((2 * Math.PI) / n);
	// #endregion

	// #region Coloring
	function stringToHash(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}
		return Math.abs(hash);
	}

	function numberToHSL(num: number) {
		const hue = num % 360;
		const saturation = 70;
		const lightness = 50;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}
	// #endregion

	// #region Animation
	let frame: number = 0;
	let spinning = $state(false);
	let startTime = $state(0);
	let rotation: number = $state(0);
	let initialRotation = $state(0);

	const TIME = 5;
	let targetRotation = $derived(((unit / 2 + unit * (-target - 1)) * 180) / Math.PI + 360 * 3 + 90);

	function animate() {
		if (spinning) {
			const t = (Date.now() - startTime) / 1000;
			rotation =
				initialRotation +
				(2 * (targetRotation - initialRotation) * t) / TIME -
				((targetRotation - initialRotation) / TIME ** 2) * t ** 2;
			console.log(rotation);
			if (t >= TIME) {
				spinning = false;
				rotation = rotation % 360;
			}
		} else {
			// rotation = ((Date.now() / 1000) * 5) % 360;
		}
		frame = requestAnimationFrame(animate);
	}

	$effect(() => {
		if (animated) {
			requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(frame);
		}
	});
	// #endregion

	export function spin() {
		spinning = true;
		startTime = Date.now();
		initialRotation = rotation;
	}
</script>

<svg viewBox="-50 -50 100 100" class="pointer-events-none w-1/3" style="rotate: {rotation}deg;">
	{#each array as item, i}
		<path
			d="M0 0 L{Math.sin(unit * i) * 50} {-Math.cos(unit * i) * 50} A50 50 0 0 1 {Math.sin(
				unit * (i + 1)
			) * 50} {-Math.cos(unit * (i + 1)) * 50} L0 0 Z"
			fill={item.color ?? numberToHSL(stringToHash(item.text))}
			stroke="#000"
			stroke-width="0.5"
		/>
		<text
			text-anchor="start"
			dominant-baseline="middle"
			transform="translate({Math.sin(unit / 2 + unit * i) * 25}, {-Math.cos(unit / 2 + unit * i) *
				25}) rotate({((unit / 2 + unit * i) * 180) / Math.PI - 90})"
			font-size="5px">{item.text}</text
		>
	{/each}
</svg>
