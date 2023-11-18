import { createClient } from '@supabase/supabase-js';
import type { CalendarDate } from '@internationalized/date';

const { VITE_DB_PROJECT_URL, VITE_DB_API_KEY, VITE_DB_SECRET_KEY } = import.meta.env;

export const supabase = createClient(VITE_DB_PROJECT_URL, VITE_DB_SECRET_KEY);

export const dbController = {
	async postDates(start: CalendarDate, end: CalendarDate) {

		const { data, error } = await supabase.from('dates').insert({ start: start, end: end }).select('id');

		if (error) {
			console.error('Error inserting data:', error);
			return null;
		}

		return data[0].id;
	},

	async checkIfCustomerExists(name, email, phone) {
		const { data, error } = await supabase
			.from('customers')
			.select('id')
			.eq('name', name)
			.eq('email', email)
			.eq('phone', phone);

		if (error) {
			console.error('Error inserting data:', error);
			return null;
		}

		return data[0].id;
	},

	async addCustomerInfo(name, email, phone) {
		const { data, error } = await supabase.from('customers').insert({ name, email, phone }).select('id');

		if (error) {
			console.error('Error inserting data:', error);
			return null;
		}

		return data[0].id;
	},

	async addBooking(datesID,customerID) {
		const { data, error } = await supabase.from('bookings').insert({ datesID, customerID });

		if (error) {
			console.error('Error inserting data:', error);
			return null;
		}

		return data;
	}
};
