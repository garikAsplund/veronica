import { createClient } from '@supabase/supabase-js';
import type { CalendarDate } from '@internationalized/date';

export const supabase = createClient(
	'https://bptvrjgppvpqzdwcshed.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdHZyamdwcHZwcXpkd2NzaGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDkxMjUsImV4cCI6MjAxNDYyNTEyNX0.2OOGe1fq3qls7B5ZRmHbUng9_mGoEGdSvazr4EcUgtE'
);

export const dbController = {
	async postDates(start: CalendarDate, end: CalendarDate) {
		console.log({ start }, { end });
		const { data, error } = await supabase.from('booked').insert({ start: start, end: end });

		if (error) {
			console.error('Error inserting data:', error);
			return null;
		}

		return data;
	}
};
