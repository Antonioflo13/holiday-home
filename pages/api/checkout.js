const stripe = require("stripe")(process.env.SECRET_API);
const YOUR_DOMAIN = process.env.DOMAIN;

const checkout = async (req, res) => {
  try {
    const quantity = req.query.q;
    const startReservation = req.query.sr;
    const endReservation = req.query.er;
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      line_items: [
        {
          price: "price_1KmekgL0ESKPzL4uDTiM8jck",
          quantity: quantity,
        },
      ],
      locale: "auto",
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success-payment?sr=${startReservation}&er=${endReservation}`,
      cancel_url: `${YOUR_DOMAIN}`,
      automatic_tax: { enabled: true },
      metadata: {
        startReservation: startReservation,
        endReservation: endReservation,
      },
    });
    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
};

export default checkout;
