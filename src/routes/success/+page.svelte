<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<div class="flex justify-center items-center h-screen -translate-y-1/3">
	<div class="text-center p-8">
		<h1 class="text-5xl mb-12">
			Thanks for booking with us{data.customerName ? `, ${data.customerName}` : ''}!
		</h1>
	</div>
</div>
