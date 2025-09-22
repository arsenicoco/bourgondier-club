import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = JSON.stringify(req.body);
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'No signature' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
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

  return res.status(200).json({ received: true });
}