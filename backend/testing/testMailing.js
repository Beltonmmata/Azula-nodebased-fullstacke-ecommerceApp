require("dotenv").config();
const sendEmail = require("../utils/emailServices");

sendEmail({
  to: "beltonvidonyi@gmail.com",
  subject: "Test Email",
  text: "This is a test email from Node.js",
  html: "<p>This is a test email from Node.js</p>",
});
