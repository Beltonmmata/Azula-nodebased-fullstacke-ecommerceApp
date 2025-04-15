require("dotenv").config();
const Newsletter = require("../models/newsletter");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const sendEmail = require("../utils/emailServices");

const subscribeToNewsletter = async (req, res) => {
  const { name, email } = req.body;
  if (!name) throw new BadRequestError("Name is required");
  if (!email) throw new BadRequestError("Email is required");

  const alreadySubscribed = await Newsletter.findOne({ email });
  if (alreadySubscribed) {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Already subscribed",
      data: alreadySubscribed,
    });
  }

  const subscriber = await Newsletter.create({ name, email });
  const emailHtml = `
    <p>Hello, ${subscriber.name}, thank you for subscribing to our weekly newsletter. We will be notifying you on news related to our store and products. Feel free always to unsubscribe.</p>
  `;

  await sendEmail({
    to: `${subscriber.email}`,
    subject: "Newsletter Subscription Confirmation",
    text: "Thank you for subscribing to our weekly newsletter",
    html: emailHtml,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Subscribed successfully",
    data: subscriber,
  });
};

const getAllSubscribers = async (req, res) => {
  const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Subscribers retrieved successfully",
    nbHits: subscribers.length,
    data: subscribers,
  });
};

module.exports = {
  subscribeToNewsletter,
  getAllSubscribers,
};
