import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Get the custom field value and map it to actual date
    const tastingDateKey = session.custom_fields?.find(
      field => field.key === 'tasting_date'
    )?.dropdown?.value;

    let selectedDate = null;
    if (tastingDateKey && session.metadata?.date_mapping) {
      const dateMapping = JSON.parse(session.metadata.date_mapping);
      selectedDate = dateMapping[tastingDateKey];
    }

    return res.status(200).json({
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      selected_date: selectedDate
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return res.status(500).json({ error: 'Failed to retrieve session' });
  }
}