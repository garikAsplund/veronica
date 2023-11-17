import Stripe from 'stripe';

const { VITE_STRIPE_SECRET_KEY } = import.meta.env;

export const stripe = new Stripe(VITE_STRIPE_SECRET_KEY, {
	apiVersion: '2023-10-16'
});
