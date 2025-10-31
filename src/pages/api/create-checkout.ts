import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // Available dates for wine tastings
    const datesData = {
      dates: [
        // "2025-10-03",
        // "2025-10-10",
        // "2025-10-17",
        // "2025-10-24",
        // "2025-10-31",
        "2025-11-07",
        "2025-11-14",
        "2025-11-21",
        "2025-11-28",
        "2025-12-05",
        "2025-12-12",
        "2025-12-19",
      ],
    };

    // Format dates for Stripe dropdown options (Russian)
    const dateOptions = datesData.dates.map((date, index) => {
      const dateObj = new Date(date);
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      const weekdays = [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
      ];

      const weekday = weekdays[dateObj.getDay()];
      const day = dateObj.getDate();
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();

      return {
        label: `${weekday}, ${day} ${month} ${year}`,
        value: `date${index}`, // Use alphanumeric value
      };
    });

    // Create date mapping for metadata
    const dateMapping = datesData.dates.reduce(
      (acc: Record<string, string>, date, index) => {
        acc[`date${index}`] = date;
        return acc;
      },
      {},
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price:
            import.meta.env.STRIPE_PRICE_ID || "price_1S7bMoL96pJGVWPvjOoYrlih", // Use existing price ID from Stripe dashboard
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${import.meta.env.SITE_URL || "http://localhost:4321"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${import.meta.env.SITE_URL || "http://localhost:4321"}/`,
      allow_promotion_codes: true,
      metadata: {
        date_mapping: JSON.stringify(dateMapping),
      },
      custom_fields: [
        {
          key: "tasting_date",
          label: {
            type: "custom",
            custom: "Выберите дату дегустации",
          },
          type: "dropdown",
          dropdown: {
            options: dateOptions,
          },
        },
      ],
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
