//BUFFER FOR DECLARE JSON IN REQ
import { buffer } from "micro";

//FIREBASE
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const reservationsCollectionRef = collection(db, "reservations");

//STRIPE
const stripe = require("stripe")(process.env.SECRET_API);
const endpointSecret = process.env.ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const addReservation = async (data) => {
  await addDoc(reservationsCollectionRef, data);
};

const stripeWebHook = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    const buf = await buffer(req);
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    const paymentIntent = event.data.object;
    switch (event.type) {
      case "checkout.session.completed":
        addReservation({
          paymentId: paymentIntent.id,
          amount: paymentIntent.amount_total,
          paymentType: paymentIntent.payment_method_types[0],
          fullName: paymentIntent.customer_details.name,
          email: paymentIntent.customer_details.email,
          paymentState: paymentIntent.status,
          startReservation: Timestamp.fromMillis(
            paymentIntent.metadata.startReservation
          ),
          endReservation: Timestamp.fromMillis(
            paymentIntent.metadata.endReservation
          ),
        });
        break;
      case "payment_intent.succeeded":
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  } catch (error) {
    console.log(error);
  }
};

export default stripeWebHook;
