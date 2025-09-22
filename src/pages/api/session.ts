import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Session ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Get the custom field value and map it to actual date
    const tastingDateKey = session.custom_fields?.find(
      field => field.key === 'tasting_date'
    )?.dropdown?.value;

    let selectedDate = null;
    if (tastingDateKey && session.metadata?.date_mapping) {
      const dateMapping = JSON.parse(session.metadata.date_mapping);
      selectedDate = dateMapping[tastingDateKey];
    }

    return new Response(JSON.stringify({
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      selected_date: selectedDate
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};