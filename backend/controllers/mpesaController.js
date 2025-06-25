const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const { stkPush } = require("../utils/mpesa");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const sendEmail = require("../utils/emailServices");
const validateObjectId = require("../utils/validateObjectId");

const initiatePayment = async (req, res) => {
  const { orderId, phone } = req.body;

  if (!/^(2547\d{8})$/.test(phone)) {
    throw new BadRequestError("Invalid phone number format");
  }

  const order = await Order.findById({ _id: orderId });
  const amount = order.totalPrice;
  validateObjectId(orderId, "order");

  const response = await stkPush({
    amount,
    phone,
    accountReference: orderId,
    transactionDesc: `Payment for Order ${orderId}`,
  });
  const { CheckoutRequestID } = response;

  //Saving CheckoutRequestID to the order
  await Order.findByIdAndUpdate(orderId, {
    "paymentResults.checkoutRequestID": CheckoutRequestID,
  });
  res.status(StatusCodes.OK).json(response);
};
const handleCallback = async (req, res) => {
  const callback = req.body?.Body?.stkCallback;
  if (!callback) {
    console.warn("⚠️ Empty or malformed callback received:", req.body); // debugger
    throw new BadRequestError("Bad callback format");
  }

  const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } =
    callback;

  console.log("📥 Callback received from Safaricom:", callback);

  // Find the order that matches this CheckoutRequestID
  const order = await Order.findOne({
    "paymentResults.checkoutRequestID": CheckoutRequestID,
  });
  if (!order) {
    throw new NotFoundError(`No order found with this CheckoutRequestID:
      ${CheckoutRequestID}`);
  }

  if (ResultCode !== 0) {
    throw new BadRequestError(
      `M-PESA Payment failed for order ${order._id}: ${ResultDesc}`
    );
  }
  // Extract metadata values
  const items = CallbackMetadata?.Item || [];
  const getItem = (key) => items.find((i) => i.Name === key)?.Value;

  const amount = getItem("Amount");
  const mpesaReceiptNumber = getItem("MpesaReceiptNumber");
  const phoneNumber = getItem("PhoneNumber");

  // ✅ Record successful payment
  order.isPaid = true;
  if (order.orderStatus === "Pending") {
    order.orderStatus = "created";
  }
  order.paymentResults = {
    checkoutRequestID: CheckoutRequestID,
    mpesaReceiptNumber,
    phoneNumber,
    amount,
    resultCode: ResultCode,
    resultDesc: ResultDesc,
    paidAt: new Date(),
  };

  await order.save();
  console.log(`✅ Payment recorded for Order ${order._id}`);
  await order.populate("userId", "name email");

  const html = generateReceiptEmail({
    name: order.userId.name,
    orderId: order._id,
    mpesaReceiptNumber,
    phoneNumber,
    amount,
    paidAt: order.paymentResults.paidAt,
  });

  await sendEmail({
    to: order.userId.email,
    subject: "Payment Confirmation – Azula Ecomerce",
    html,
  });

  return res.status(StatusCodes.OK).send("Callback processed successfully");
};

function generateReceiptEmail({
  name,
  orderId,
  mpesaReceiptNumber,
  phoneNumber,
  amount,
  paidAt,
}) {
  return `
    <div
      style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: auto;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e3e3e3;
      "
    >
      <!-- Header -->
      <div
        style="
          background-color: rgb(126, 68, 243);
          padding: 20px;
          color: #fff;
          text-align: center;
        "
      >
        <h2 style="margin: 0">
          <span style="color: rgb(187, 70, 2)">A</span>zula Ecomerce
        </h2>
        <p style="margin: 4px 0 0">Payment Receipt</p>
      </div>

      <!-- Body -->
      <div style="padding: 24px">
        <h3 style="color: rgb(10, 187, 10); margin-top: 0; text-align: center">
          ✅ Payment Successful
        </h3>
        <p style="color: rgb(34, 36, 41)">Hello ${name || "Customer"},</p>
        <p style="color: rgb(34, 36, 41)">
          We have received your payment Successful.Thank you for your payment.
          Below are your transaction details:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px">
          <tr>
            <td style="padding: 8px 0; color: #666">
              <strong>Order ID:</strong>
            </td>
            <td style="padding: 8px 0; color: #000">${orderId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666">
              <strong>Receipt Number:</strong>
            </td>
            <td style="padding: 8px 0; color: #000">${mpesaReceiptNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666">
              <strong>Phone Number:</strong>
            </td>
            <td style="padding: 8px 0; color: #000">${phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666">
              <strong>Amount Paid:</strong>
            </td>
            <td style="padding: 8px 0; color: #000">
              KES ${amount.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666">
              <strong>Paid On:</strong>
            </td>
            <td style="padding: 8px 0; color: #000">
              ${new Date(paidAt).toLocaleString()}
            </td>
          </tr>
        </table>

        <!-- Track Order Call To Action -->
        <div style="margin-top: 30px; text-align: center">
          <a
            href="https://yourstore.com/orders/${orderId}"
            style="
              display: inline-block;
              background-color: rgb(187, 70, 2);
              color: #fff;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
            "
          >
            View Your Order
          </a>
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: rgb(102, 102, 102)">
          If you have any questions, reply to this email or contact support.
        </p>
      </div>

      <!-- Footer -->
      <div
        style="
          background-color: rgb(126, 68, 243);
          padding: 16px;
          color: white;
          text-align: center;
          border-top: 1px solid #fff;
        "
      >
        <p style="margin: 0; font-size: 12px">
          &copy; ${new Date().getFullYear()} Developer Belton. All rights
          reserved.
        </p>
      </div>
    </div>
  
  `;
}

module.exports = { initiatePayment, handleCallback };
