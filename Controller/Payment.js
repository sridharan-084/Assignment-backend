const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Subscribe = require("../model/Subscribe");

const payment = async (req, res) => {
  let { amount, id, userEmail, card, Package } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "RichPanel",
      payment_method: id,
      confirm: true,
    });
    // console.log("Payment", payment);
    try {
      const subscribe = await new Subscribe({
        email: userEmail,
        subscribe: true,
        subscriptionType: Package,
        PlanType: card.type,
        monthlyPrice: card.price,
        Devices: card.usedin,
      });
      const savedSubscriber = await subscribe.save();
      res.json({
        message: "Payment successful",
        success: true,
      });
    } catch (error) {
      console.log("Error while payment and saving user to the database", error);
      res.json({
        message: "Database Error",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

module.exports = payment;
