import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const stripe = new Stripe("sk_live_YOUR_LIVE_SECRET_KEY_HERE", {
  apiVersion: "2024-12-18.acacia"
});
const POST = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      "whsec_YOUR_WEBHOOK_SECRET_HERE"
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook signature verification failed", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const tastingDateKey = session.custom_fields?.find(
      (field) => field.key === "tasting_date"
    )?.dropdown?.value;
    if (tastingDateKey && session.metadata?.date_mapping) {
      const dateMapping = JSON.parse(session.metadata.date_mapping);
      const actualDate = dateMapping[tastingDateKey];
      console.log("Payment completed for tasting date:", actualDate);
      console.log("Customer email:", session.customer_details?.email);
      console.log("Session ID:", session.id);
    }
  }
  return new Response("OK", { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
