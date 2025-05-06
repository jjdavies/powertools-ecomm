import "server-only";

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key in environment variables");
}
// Initialize Stripe with the secret key from environment variables

export const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
