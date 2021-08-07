const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")("sk_test_51JLmNVFwDMkzDlScLybfqRxpx8wvJMwvOoyuoRLwkUC7zezmgf97IOywpNotXMkHFJbFmNY4oN1oBhqmRrUCPjZK00Dqnc7A9H");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const productId = req.body.id;
    console.log(productId);
    try {
      const prod = await (
        await admin.firestore().doc(`product/${productId}`).get()
      ).data();
      console.log(prod);
      const session = await stripe.checkout.sessions.create({
        success_url: prod.successUrl + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: prod.failedUrl,
        payment_method_types: ["card"],
        line_items: [
          {
            amount: prod.amount,
            quantity: prod.quantity,
            name: prod.name,
            description: prod.description,
            currency: prod.currency,
          },
        ],
        mode: "payment",
      });
      res.status(200).send(session.url);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
});

exports.getCustomerDetails = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    //console.log(req);

    const sessionId = req.body.sessionId;
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const customer = await stripe.customers.retrieve(session.customer);
        let details = {};
        details.customerEmail = customer.email;
        details.amount = session.amount_total;
        details.name = customer.name;

        res.status(200).send(details);
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  });
});
