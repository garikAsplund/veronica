<script lang="ts">
	import { browser } from '$app/environment';

	const images: string[] = [
		'https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	];

	if (browser) {
		document.addEventListener('wheel', handleScroll);
	}

	function handleScroll(event): void {
		const scrollAmount = event.deltaY;
		const container = document.querySelector('.image-container');

		if (container) {
			container.scrollLeft += scrollAmount;
		}
	}
</script>

<div
	class="flex overflow-x-auto snap-type-mandatory h-1/2 object-cover bg-scroll scrollbar-hide image-container"
>
	{#each images as image}
		<div class="flex-shrink-0 w-full snap-align-start">
			<img src={image} alt="unsplash" class="h-full w-full object-cover" />
		</div>
	{/each}
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* For IE, Edge and Firefox */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
