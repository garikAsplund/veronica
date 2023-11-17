import { stripe } from '../stripe';
import type { RequestHandler } from '@sveltejs/kit';
import { dbController } from '$lib/supabaseClient';

const WEBHOOK_SECRET: string =
	'whsec_459f18d7e9caefb6e29246aec9373a5e8ad079c3836f908572a46e85062d3b64';

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

	const event = stripe.webhooks.constructEvent(payload, signature, WEBHOOK_SECRET);
	const data = event.data;

	switch (event.type) {
		case 'checkout.session.completed':
			for (const key in data) {
				console.log({ key }, data[key]);
			}
			console.log(`It went through!`);
			customerName = data.object.customer_details.name.split(' ')[0];
			console.log(`Thank you, ${customerName}`);
			dbController.postDates(data.object.metadata.start, data.object.metadata.end);
			break;
		default:
			console.log('Something went wrong, I think');
	}

	return new Response(JSON.stringify({ received: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
