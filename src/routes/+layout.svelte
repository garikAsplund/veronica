<script lang="ts">
	import '../app.css';
	import Calendar from '$lib/components/Calendar.svelte';
	import { page } from '$app/stores';
</script>

<div class="fixed inset-0 overflow-hidden">
	<div class="flex-col align-middle justify-center h-screen w-screen">
		<h1
			class="h1 text-center font-extrabold text-transparent lg:text-8xl md:text-6xl text-4xl bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 m-12"
		>
			<a href="/">Veronica's 3rd Home</a>
		</h1>
		<div class=" align-top">
			<div class="flex w-1/2 mx-auto mb-2 justify-around text-gray-400">
				<a href="/about" class="px-6 py-2 hover:border-gray-600 hover:text-gray-600">About</a>
				<a href="/location" class="px-6 py-2 hover:border-gray-600 hover:text-gray-600">Location</a>
				<a href="/policies" class="px-6 py-2 hover:border-gray-600 hover:text-gray-600">Policies</a>
			</div>
		</div>
		<slot />
		{#if $page.data.route.id !== '/success'}
			<Calendar />
		{/if}
	</div>
</div>

<style lang="postcss">
	.h1 {
		@apply text-center font-extrabold  text-transparent m-12;
		background-clip: text;
		animation: hueShift 60s infinite linear;
	}

	@keyframes hueShift {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}
</style>
