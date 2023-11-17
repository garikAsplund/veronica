import { stripe } from '../stripe';
import { redirect, type RequestHandler } from '@sveltejs/kit';
const { VITE_BASE_URL } = import.meta.env;

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const lineItems = [
		{
			price_data: {
				currency: 'USD',
				product_data: {
					name: 'Vacation!',
					images: [
						'https://images.unsplash.com/photo-1516476587287-b06497154630?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					]
				},
				unit_amount: 23000
			},
			quantity: data.items
		}
	];

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		metadata: {
			start: data.start,
			end: data.end
		},
		success_url: `${VITE_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${VITE_BASE_URL}/cancel`,
		phone_number_collection: {
			enabled: true
		}
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};

export const GET: RequestHandler = () => {
	throw redirect(301, '/');
};
