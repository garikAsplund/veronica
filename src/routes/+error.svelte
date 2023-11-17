<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="text-center -translate-y-1/2">
		<h1 class="text-5xl text-gray-800 mb-8">{$page.status}</h1>
		<p class="text-xl text-gray-600 mb-12">Sorry, something went wrong.</p>
		<button
			class="bg-cyan-200 hover:bg-cyan-200/80 rounded-sm p-3 border-1 border-slate-500 text-xl"
			on:click={() => goto('/')}>Go back home</button
		>
	</div>
</div>
