<script lang="ts">
	import type { PageData } from './$types';
	import Images from '$lib/components/Images.svelte';
	import Calendar from '$lib/components/Calendar.svelte';

	export let data: PageData;
</script>

<div class="fixed inset-0 overflow-hidden">
	<div class="flex-col align-middle justify-center h-screen w-screen">
		<h1
			class="h1 text-center font-extrabold text-transparent lg:text-8xl md:text-6xl text-4xl bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 m-12"
		>
			Veronica's 3rd Home
		</h1>

		<Images />
		<Calendar {data} />
	</div>
</div>
