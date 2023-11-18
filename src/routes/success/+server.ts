import { stripe } from '../stripe';
import type { RequestHandler } from '@sveltejs/kit';
import { dbController, supabase } from '$lib/supabaseClient';

const { VITE_WEBHOOK_SECRET } = import.meta.env;

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

let customerName: string = '';

export const POST: RequestHandler = async ({ request }) => {
	let eventType: string | undefined;

	const _rawBody = await request.arrayBuffer();
	const payload = toBuffer(_rawBody);

	const signature = request.headers.get('stripe-signature');

	const event = stripe.webhooks.constructEvent(payload, signature, VITE_WEBHOOK_SECRET);
	const data = event.data;
	
	switch (event.type) {
		case 'checkout.session.completed':
			const customerName = data.object.customer_details.name;
			const customerEmail = data.object.customer_details.email;
			const customerPhone = data.object.customer_details.phone;
			
			const datesID = await dbController.postDates(data.object.metadata.start, data.object.metadata.end);
			
			const existingCustomerID = await dbController.checkIfCustomerExists(customerName, customerEmail, customerPhone); 

			let customerID;

			if (existingCustomerID?.length === 0) {
				const newCustomerID = dbController.addCustomerInfo(customerName, customerEmail, customerPhone);

				customerID = newCustomerID;

			} else {
				customerID = existingCustomerID;
			}

			dbController.addBooking(datesID, customerID);
			
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(JSON.stringify({ received: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
