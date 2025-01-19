const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const routes = require("./routes/routes");
const storeRoutes = require("./routes/store");
const productRoutes = require("./Items/routes/Items.route");
const cartRoutes = require("./Cart/routes/cart.routes");
const userRoutes = require("./User/routes/user.routes");
const authenticateStore = require("./utils/middleware/authMiddleware");
const { responseFail } = require("./utils/response/reponse");
const bodyParser = require("body-parser");
const { stripeWebhook } = require("./User/controller/user.controller");

const PORT = process.env.PORT || 3001;
const DBURL = process.env.DATABASE_URL;

mongoose
  .connect(DBURL)
  .then(() =>
    console.log(`
Connected to MongoDB at ${DBURL}`)
  )
  .catch((err) => console.error);

const app = express();

// Stripe Webhook Endpoint
app.post(
  "/webhook",
  express.raw({ type: "application/json" }), // Use raw parser only for the webhook
  stripeWebhook
);
app.use(express.json());
app.use(cors());

// app.use('/', authenticateStore, storeRoutes);
app.use("/", storeRoutes);
app.use("/admin", routes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);

app.use(bodyParser.json());
// app.use(express.static('uploads'))
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
