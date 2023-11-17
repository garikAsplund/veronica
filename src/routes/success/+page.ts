import type { PageLoad } from './$types';
import { stripe } from '../stripe';

export const load: PageLoad = async ({ url }) => {
	const session = await stripe.checkout.sessions.retrieve(url.searchParams.get('session_id'));
	const customerName = session.customer_details.name ? session.customer_details.name : '';

	return {
		customerName
	};
};
