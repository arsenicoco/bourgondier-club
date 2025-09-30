import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Available dates for wine tastings
    const datesData = {
      dates: [
        // "2025-10-03",
        "2025-10-10",
        "2025-10-17",
        "2025-10-24",
        "2025-10-31",
        "2025-11-07",
        "2025-11-14",
        "2025-11-21",
        "2025-11-28",
        "2025-12-05",
        "2025-12-12",
        "2025-12-19",
      ],
    };

    // Format dates for Stripe dropdown options (English)
    const dateOptions = datesData.dates.map((date, index) => {
      const dateObj = new Date(date);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);

      return {
        label: formattedDate,
        value: `date${index}`, // Use alphanumeric value
      };
    });

    // Create date mapping for metadata
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
              description: "Individual wine tasting session in Amsterdam",
            },
            unit_amount: 2500, // €25.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://club.bourgondier.wine"}/en/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://club.bourgondier.wine"}/en/`,
      metadata: {
        date_mapping: JSON.stringify(dateMapping),
      },
      custom_fields: [
        {
          key: "tasting_date",
          label: {
            type: "custom",
            custom: "Select tasting date",
          },
          type: "dropdown",
          dropdown: {
            options: dateOptions,
          },
        },
      ],
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
