<script lang="ts">
	import { dbController } from '$lib/supabaseClient';
	import { createDateRangePicker, melt } from '@melt-ui/svelte';
	import { ChevronRight, ChevronLeft, Calendar } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { CalendarDate, today, getLocalTimeZone, parseDate } from '@internationalized/date';
	import type { PageData } from '../../routes/$types';

	export let data: PageData;
	const bookedDates: string[] = [];

	data.booked?.forEach((bookedEntry) => {
		let bookedDate = parseDate(bookedEntry.start);
		const bookedDateEnd = parseDate(bookedEntry.end);
		while (bookedDateEnd.compare(bookedDate) != 0) {
			bookedDates.push(bookedDate.toString());
			bookedDate = bookedDate.add({ days: 1 });
		}
		bookedDates.push(bookedDateEnd.toString());
	});

	let mobileCalendar: number = 1;
	let bookButtonEnabled: boolean = false;

	if (browser) {
		mobileCalendar = window.innerWidth < 500 ? 1 : 2;
	}

	const todaysDate: CalendarDate = today(getLocalTimeZone());

	const {
		elements: {
			calendar,
			cell,
			content,
			field,
			grid,
			heading,
			nextButton,
			prevButton,
			startSegment,
			endSegment,
			trigger
		},
		states: { months, headingValue, daysOfWeek, segmentContents, open, value },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createDateRangePicker({
		minValue: new CalendarDate(todaysDate.year, todaysDate.month, todaysDate.day),
		maxValue: new CalendarDate(todaysDate.year + 1, todaysDate.month, todaysDate.day),
		forceVisible: true,
		fixedWeeks: true,
		numberOfMonths: mobileCalendar,
		onValueChange: switchBookButton,
		isDateUnavailable: (date) => {
			return bookedDates.includes(date.toString()) && date.compare(todaysDate) >= 0;
		}
	});

	function switchBookButton({ curr, next }) {
		bookButtonEnabled = next.end && next.start ? true : false;
		return next;
	}
</script>

<div
	class="picker-container fixed md:bottom-16 lg:bottom-24 bottom-8 scale-110 flex justify-center"
>
	<div>
		<div use:melt={$field}>
			{#each $segmentContents.start as seg}
				<div use:melt={$startSegment(seg.part)}>
					{seg.value}
				</div>
			{/each}
			<div aria-hidden="true">-</div>
			{#each $segmentContents.end as seg}
				<div use:melt={$endSegment(seg.part)}>
					{seg.value}
				</div>
			{/each}
			<div class="button-container">
				<button use:melt={$trigger}>
					<Calendar size={16} />
				</button>
			</div>
		</div>
	</div>
	{#if $open}
		<div transition:fade={{ duration: 250 }} use:melt={$content}>
			<div use:melt={$calendar}>
				<header>
					<button use:melt={$prevButton}>
						<ChevronLeft size={24} />
					</button>
					<div use:melt={$heading}>
						{$headingValue}
					</div>
					<button use:melt={$nextButton}>
						<ChevronRight size={24} />
					</button>
				</header>
				<div>
					{#each $months as month}
						<table use:melt={$grid}>
							<thead aria-hidden="true">
								<tr>
									{#each $daysOfWeek as day}
										<th>
											<div>
												{day}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each month.weeks as weekDates}
									<tr>
										{#each weekDates as date}
											<td
												role="gridcell"
												aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}
											>
												<div use:melt={$cell(date, month.value)}>
													{date.day}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					{/each}
				</div>
			</div>
		</div>
	{/if}
	<div style="text-center">
		<div style="opacity: {bookButtonEnabled ? 1 : 0}; transition: opacity 1.25s;">
			<button
				class="m-3 text-xl text-gray-800/80 hover:text-gray-900/80 font-semibold"
				disabled={!bookButtonEnabled}
				on:click={() => dbController.postDates($value.start?.toString(), $value.end?.toString())}
			>
				Book now
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.picker-container {
		@apply flex w-full flex-col items-center gap-3;
	}

	.button-container {
		@apply ml-4 flex w-full items-center justify-end;
	}

	[data-melt-popover-content] {
		@apply z-10 min-w-[320px] rounded-lg bg-neutral-900/10 shadow-sm;
	}

	[data-melt-popover-trigger] {
		@apply rounded-md bg-cyan-400 p-1 text-neutral-950 transition-all hover:bg-cyan-400/80;
	}

	[data-melt-datefield-label] {
		@apply font-medium text-white;
	}

	[data-melt-datefield-label][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-field] {
		@apply mt-1.5 flex w-full min-w-[200px] items-center rounded-lg border border-cyan-400/60 bg-neutral-200/40 p-1.5 text-gray-700;
		animation: hueShift 60s infinite linear;
	}

	[data-melt-datefield-field][data-invalid] {
		@apply border-red-400;
	}

	[data-melt-datefield-segment][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-segment]:not([data-segment='literal']) {
		@apply px-0.5;
	}

	[data-melt-datefield-validation] {
		@apply self-start text-red-500;
	}

	[data-melt-calendar] {
		@apply w-full rounded-lg bg-white/90 p-3 text-gray-700 shadow-sm;
	}

	header {
		@apply flex items-center justify-between pb-2;
	}

	header + div {
		@apply flex items-center gap-6;
	}

	[data-melt-calendar-prevbutton] {
		@apply rounded-lg p-1 transition-all hover:bg-cyan-500/20;
	}

	[data-melt-calendar-nextbutton] {
		@apply rounded-lg p-1 transition-all hover:bg-cyan-500/20;
	}

	[data-melt-calendar-prevbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-nextbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-heading] {
		@apply font-semibold;
	}

	th {
		@apply text-sm font-semibold;

		& div {
			@apply flex h-6 w-6 items-center justify-center p-4;
		}
	}

	[data-melt-calendar-grid] {
		@apply w-full;
	}

	[data-melt-calendar-cell] {
		@apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-cyan-500/20  focus:ring focus:ring-cyan-400;
		animation: hueShift 60s infinite linear;
	}

	[data-melt-calendar-cell][data-highlighted] {
		@apply bg-cyan-600/20;
		animation: hueShift 60s infinite linear;
	}

	[data-melt-calendar-cell][data-range-highlighted] {
		@apply bg-cyan-600/20;
		animation: hueShift 60s infinite linear;
	}

	[data-melt-calendar-cell][data-disabled] {
		@apply pointer-events-none opacity-40;
	}

	[data-melt-calendar-cell][data-unavailable] {
		@apply pointer-events-none text-red-400 line-through;
	}

	[data-melt-calendar-cell][data-selected] {
		@apply bg-cyan-400 text-neutral-950;
		animation: hueShift 60s infinite linear;
	}

	[data-melt-calendar-cell][data-outside-visible-months] {
		@apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
	}

	[data-melt-calendar-cell][data-outside-month] {
		@apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
	} /* ... other styles ... */

	.h1 {
		@apply text-center font-extrabold  text-transparent m-12;
		background-clip: text;
		animation: hueShift 60s infinite linear;
		/* You can adjust the animation duration and other properties as needed */
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
