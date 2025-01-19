const { Router } = require("express");
const bodyParser = require("body-parser");
const { createUser, getAllUser, getUser, deleteUser, checkOutSession, stripeWebhook } = require("../controller/user.controller");
const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/", deleteUser);

router.post("/create-checkout-session", checkOutSession);
// router.post("/webhook",bodyParser.raw({ type: "application/json" }), stripeWebhook);
// router.post("/webhook", stripeWebhook);

module.exports = router;
