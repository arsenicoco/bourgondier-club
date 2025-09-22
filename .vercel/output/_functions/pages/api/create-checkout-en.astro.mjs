import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const stripe = new Stripe("sk_live_YOUR_LIVE_SECRET_KEY_HERE", {
  apiVersion: "2024-12-18.acacia"
});
const POST = async ({ request }) => {
  try {
    const datesResponse = await fetch(`${"https://your-domain.vercel.app"}/dates.json`);
    const datesData = await datesResponse.json();
    const dateOptions = datesData.dates.map((date, index) => {
      const dateObj = new Date(date);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);
      return {
        label: formattedDate,
        value: `date${index}`
        // Use alphanumeric value
      };
    });
    const dateMapping = datesData.dates.reduce((acc, date, index) => {
      acc[`date${index}`] = date;
      return acc;
    }, {});
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Wine Tasting - One-off Session",
              description: "Individual wine tasting session in Amsterdam"
            },
            unit_amount: 2500
            // €25.00 in cents
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${"https://your-domain.vercel.app"}/en/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${"https://your-domain.vercel.app"}/en/`,
      metadata: {
        date_mapping: JSON.stringify(dateMapping)
      },
      custom_fields: [
        {
          key: "tasting_date",
          label: {
            type: "custom",
            custom: "Select tasting date"
          },
          type: "dropdown",
          dropdown: {
            options: dateOptions
          }
        }
      ]
    });
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
