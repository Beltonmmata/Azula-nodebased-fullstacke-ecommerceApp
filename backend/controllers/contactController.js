require("dotenv").config();
const Contact = require("../models/contactUs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const sendEmail = require("../utils/emailServices");

// POST /api/v1/contact
const submitContactForm = async (req, res) => {
  const { fullName, email, subject, message } = req.body;
  if (!fullName || !email || !subject || !message) {
    throw new BadRequestError("All fields are required");
  }

  const contact = await Contact.create({ fullName, email, subject, message });
  const emailHtml = `
    <p>Hello,${contact.fullName} thank you for reaching us through contact form.Our support team will work on your response and we will reach you out to you to consider your message.</p>
    `;

  await sendEmail({
    to: `${contact.email}`,
    subject: "Contact Support Confirmation",
    text: "Thank you for contacting our support team",
    html: emailHtml,
  });

  res
    .status(StatusCodes.CREATED)
    .json({
      success: true,
      message: "Your message has been sent",
      data: contact,
    });
};

// GET /api/v1/contact — Admin only
const getAllContacts = async (req, res) => {
  const messages = await Contact.find().sort({ submittedAt: -1 });
  res.status(StatusCodes.OK).json({ count: messages.length, messages });
};

module.exports = {
  submitContactForm,
  getAllContacts,
};
