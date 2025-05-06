import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../lib/stripe";

export async function POST() {
  const headersList = await headers();
  const origin = headersList.get("origin");
  console.log("Creating checkout session...");
  try {
    //create price on stripe
    const product = await stripe.products.create({
      name: "Cart",
      description: "User created cart",
    });
    console.log(product);
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: 1000,

      product_data: {
        name: "User Cart",
      },
    });
    console.log(product, price);
    //create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });
    console.log(session);
    return NextResponse.redirect(
      new URL(session.url as string, headersList.get("origin") as string)
    );
    // return;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.redirect(
      new URL("/cart", headersList.get("origin") as string)
    );
    // return NextResponse.json(
    //   { error: "Failed to create checkout session" },
    //   { status: 500 }
    // );
  }
}

export const dynamic = "force-dynamic";
