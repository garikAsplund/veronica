import type { PageLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageLoad = async ({ route }) => {
	const { data } = await supabase.from('dates').select();
	return {
		booked: data,
		route
	};
};
