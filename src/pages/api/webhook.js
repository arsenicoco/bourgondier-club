import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST({ request }) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response(JSON.stringify({ error: 'No signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get the custom field value
    const tastingDateKey = session.custom_fields?.find(
      field => field.key === 'tasting_date'
    )?.dropdown?.value;

    if (tastingDateKey && session.metadata?.date_mapping) {
      // Parse the date mapping and get the actual date
      const dateMapping = JSON.parse(session.metadata.date_mapping);
      const actualDate = dateMapping[tastingDateKey];
      
      console.log('Payment completed for tasting date:', actualDate);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Session ID:', session.id);
      
      // Here you can:
      // 1. Send confirmation email with the date
      // 2. Store in database
      // 3. Update inventory/availability
      // 4. Add to calendar
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}