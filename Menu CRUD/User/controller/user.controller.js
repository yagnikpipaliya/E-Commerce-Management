const { responseCreated, responseFail, responseSuccess } = require("../../utils/response/reponse");
const User = require("../model/user.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createUser = async (req, res) => {
  try {
    const { id, name, given_name, family_name, email, picture } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId: id,
        name,
        firstname: given_name,
        lastname: family_name,
        email,
        picture,
        role: "user",
      });

      await user.save();
      responseCreated(res, user);
    } else {
      responseSuccess(res, user);
    }
    // const newUser = await User(req.body).save();
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const getUser = await User.find({ _id: req.params.id });
    responseSuccess(res, getUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const getUser = await User.find();
    responseSuccess(res, getUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    responseSuccess(res, deletedUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const checkOutSession = async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body; // Send cart items and total from the frontend

    // Create a line items array for Stripe
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3001/", // Replace with your success page
      cancel_url: "http://localhost:3001/",  // Replace with your cancel page
    });

    responseSuccess(res, session);
    // res.json({ url: session.url }); // Send the session URL to the frontend
  } catch (error) {
    console.error("Error creating checkout session:", error);
    responseFail(res, 500, error?.message || "Failed to create checkout session");
    // res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const stripeWebhook = async (req, res) => {
  console.log("Stripe Webhook Received");
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Verify and construct the Stripe event
    event = stripe.webhooks.constructEvent(req.body, signature, "whsec_a1a616ddd3b1879dd21591a74adb4e64c012d5744b88790e59338093ca267309");

    console.log("Event:", event);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log("Payment Intent:", paymentIntent);
        if (paymentIntent.invoice) {
          const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);
          console.log("Invoice Link:", invoice.hosted_invoice_url);
        }
        break;

      case "payment_intent.succeeded":
        console.log("Payment succeeded:", event.data.object);
        break;

      case "charge.updated":
        const charge = event.data.object;
        console.log("Charge Updated:", charge);

        // Example: Log the updated receipt URL
        if (charge.receipt_url) {
          console.log("Updated Receipt URL:", charge.receipt_url);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // // Handle specific event types
    // if (event.type === "checkout.session.completed") {
    //   const session = event.data.object;

    //   // Retrieve payment intent
    //   const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    //   console.log("Payment Intent:", paymentIntent);

    //   // Example: Log invoice link if available
    //   if (paymentIntent.invoice) {
    //     const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);
    //     console.log("Invoice Link:", invoice.hosted_invoice_url);
    //   }

    //   res.json({ received: true });
    // } else if (event.type === "payment_intent.succeeded") {
    //   console.log("Payment succeeded:", event.data.object);
    //   res.json({ received: true });
    // } else {
    //   console.log(`Unhandled event type ${event.type}`);
    //   res.json({ received: true });
    // }
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { createUser, getUser, getAllUser, deleteUser, checkOutSession, stripeWebhook };
