import { stripe } from '../stripe';
import type { RequestHandler } from '@sveltejs/kit';
import { dbController } from '$lib/supabaseClient';

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
			dbController.postDates(data.object.metadata.start, data.object.metadata.end);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(JSON.stringify({ received: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
