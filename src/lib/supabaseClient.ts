import { createClient } from '@supabase/supabase-js';
import type { CalendarDate } from '@internationalized/date';

const { VITE_DB_PROJECT_URL, VITE_DB_API_KEY } = import.meta.env;

export const supabase = createClient(VITE_DB_PROJECT_URL, VITE_DB_API_KEY);

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
