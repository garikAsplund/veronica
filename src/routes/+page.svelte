<script lang="ts">
	import type { PageData } from './$types';
	import Images from '$lib/components/Images.svelte';
	import Calendar from '$lib/components/Calendar.svelte';

	export let data: PageData;
</script>

<Images />
<Calendar {data} />
