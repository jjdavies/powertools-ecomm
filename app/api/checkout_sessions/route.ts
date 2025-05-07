import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../lib/stripe";

export async function POST(Req: NextRequest) {
  const data = await Req.formData();
  if (data === null) {
    return NextResponse.redirect("/cart");
  }
  const productsquantities = data.get("productsquantities");
  const subtotal: number = data.get("subtotal") as unknown as number;
  const shipping: number = data.get("shipping") as unknown as number;
  const total: number = (+subtotal * 100 +
    +shipping * 100) as unknown as number;
  console.log(productsquantities, subtotal, shipping);
  const headersList = await headers();
  const origin = headersList.get("origin");
  if (productsquantities === null) {
    return NextResponse.redirect("/cart");
  }
  if (subtotal === null) {
    return NextResponse.redirect("/cart");
  }
  if (shipping === null) {
    return NextResponse.redirect("/cart");
  }
  try {
    //create price on stripe
    // const product = await stripe.products.create({
    //   name: data.productsquantities,
    //   description: "User created cart",
    // });
    // console.log(product);
    const price = await stripe.prices.create({
      currency: "gbp",
      unit_amount_decimal: total + "",

      product_data: {
        name: ("User Basket:" + productsquantities) as string,
      },
    });
    // console.log(product, price);
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
    // console.log(session);
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
