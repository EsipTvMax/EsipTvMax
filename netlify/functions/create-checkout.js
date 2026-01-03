const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Commande EsipTvMax"
            },
            unit_amount: 1000
          },
          quantity: 1
        }
      ],
      success_url: "https://TONSITE.netlify.app/success.html",
      cancel_url: "https://TONSITE.netlify.app/cancel.html"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};

