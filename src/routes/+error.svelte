<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center -translate-y-1/4">
	<div class="text-center">
		<h1 class="text-5xl text-gray-800 dark:text-gray-300 mb-8">{$page.status}</h1>
		<p class="text-xl text-gray-600 dark:text-gray-400 mb-12">Sorry, something went wrong.</p>
		<a
			href="/"
			class="colorShift inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-500/90 text-white rounded"
			>Home</a
		>
	</div>
</div>
