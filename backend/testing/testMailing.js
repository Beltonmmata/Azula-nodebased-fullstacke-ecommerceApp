require("dotenv").config();
const sendEmail = require("../utils/emailServices");

const emailHtml = `
        <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Order Confirmation</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <table style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
              <tr>
                <td align="center">
                  <h2 style="color: #0073e6;">Thank You for Your Order!</h2>
                  <p style="color: #555;">Your order has been successfully placed.</p>
                  <hr>
                </td>
              </tr>

              <tr>
                <td>
                  <h3>Order Summary</h3>
                  <p><strong>Order ID:</strong> #34554566445555</p>
                  <p><strong>Date:</strong> 27th march 2025</p>
                </td>
              </tr>

              <tr>
                <td>
                  <table width="100%" border="0" cellspacing="0" cellpadding="5">
                    <tr>
                      <th align="left">Item</th>
                      <th align="right">Price</th>
                    </tr>
                    <tr>
                        <td>brown jacket - 1pair</td>
                        <td align="right">1500</td>
                      </tr>
                    <tr>
                        <td>brown jacket - 1pair</td>
                        <td align="right">1500</td>
                      </tr>
                    <tr>
                        <td>brown jacket - 1pair</td>
                        <td align="right">1500</td>
                      </tr>
                  </table>
                  <hr>
                </td>
              </tr>

              <tr>
                <td align="right">
                  <h3>Total: <span style="color: #0073e6;">5000</span></h3>
                </td>
              </tr>

              <tr>
                <td align="center">
                  <a href="http//youtube.com" style="background-color: #0073e6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
                    Track Your Order
                  </a>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-top: 20px;">
                  <p style="color: #888;">If you have any questions, <a href="mailto:beltonvidonyi@gmail.com.com">contact us</a></p>
                </td>
              </tr>
            </table>
          </body>
          </html>

      `;

sendEmail({
  to: "beltonmmata@gmail.com",
  subject: "Test Email",
  text: "This is a test email from Node.js",
  html: emailHtml,
});
