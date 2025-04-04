require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("../models/order");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const sendEmail = require("../utils/emailServices");
const getAllOrders = async (req, res) => {
  let orders;
  if (req.user.isAdmin) {
    orders = await Order.find({}).sort({ createdAt: -1 });
  } else {
    orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  }

  if (orders.length === 0) {
    throw new NotFoundError("No orders found");
  }
  res.status(200).json({ orders });
};

const getOrder = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new NotFoundError(`Order  with id ${id}  not found`);
  }
  res.status(200).json({ order });
};
const createOrder = async (req, res, next) => {
  try {
    console.log("User in createOrder:", req.user);

    if (!req.user) {
      throw new UnauthenticatedError("User authentication failed");
    }

    const {
      orderItems,
      deliveryOption,
      shipping,
      payment,
      totalPrice,
      shippingPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestError("No order items provided");
    }

    if (!totalPrice || !shippingPrice) {
      throw new BadRequestError("Total price and shipping price are required");
    }

    const selectedPaymentMethod = payment?.paymentMethod || "Pay on Delivery";

    const order = await Order.create({
      userId: req.user.id,
      orderItems,
      deliveryOption,
      shipping,
      payment: {
        paymentMethod: selectedPaymentMethod,
      },
      totalPrice,
      shippingPrice,
      isPaid: selectedPaymentMethod === "Pay on Delivery" ? false : false,
    });

    console.log("Created Order:", order);

    // Send Email (Wrap in Try-Catch)
    try {
      const emailSubject = "Order Confirmation";
      const emailText = `Dear ${req.user.name},\n\nThank you for your order!\nOrder ID: ${order._id}\nTotal: $${order.totalPrice}\n \n We have received and we are preparing goods for shipping .We will notify you when your order is shipped.`;

      const generateOrderEmail = (order, user) => {
        return `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background:hsl(36, 33%, 94%);  box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5)">
            <header style=" background:rgb(126, 68, 243); color: #fff; padding: 30px 10px ; text-align: center; font-size: 20px; border-radius:5px 5px 0 0;">
            Order Confirmation - Thank You for Your Purchase!
            </header>

            <section style="background: #fff; padding: 10px; border-radius: 10px; margin:10px;">
            <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px;">Customer Details</h3>
            <p style="font-size:13px"><strong style="font-size:15px">Name:</strong> ${
              user.name
            }</p>
            <p style="font-size:13px"><strong style="font-size:15px">Email:</strong> ${
              user.email
            }</p>
            </section>

            <section style="padding: 10px; background: #fff; border-radius: 10px; margin: 10px;">
            <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px">Shipping Details</h3>
            <p style="font-size:13px"><strong style="font-size:15px">Address:</strong> ${
              order.shipping.houseAddress
            }, ${order.shipping.city}, ${order.shipping.state}, ${
          order.shipping.country
        } (${order.shipping.zipCode})</p>
            <p style="font-size:13px"><strong style="font-size:15px">Phone:</strong> ${
              order.shipping.phoneNumber
            }</p>
            </section>
             <section style="padding: 10px; background: #fff; border-radius: 10px; margin: 10px;">
            <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px">Payment & Delivery</h3>
            <p style="font-size:13px"><strong style="font-size:15px">Payment Method:</strong> ${
              order.payment.paymentMethod
            }</p>
            <p style="font-size:13px"><strong style="font-size:15px">Delivery Option:</strong> ${
              order.deliveryOption.name
            }          
           </p>
            <p style="font-size:13px"><strong style="font-size:15px">Estimated Delivery:</strong>${
              order.deliveryOption.durationInDays
            } days</p>
            </section>
            <section style="display: flex; align-items: center; flex-direction:column; padding: 10px; background: #f9f9f9; border-radius: 10px; margin: 10px;">
            <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px">Order Items</h3>
            <div style="gap:15px; width:100%;">
               <div style="display: grid; grid-template-columns: 2fr 1fr 1fr">
                 <p style="font-size:13px"><strong style="font-size:15px">Product ID </strong></p>
                    <p style="font-size:13px"><strong style="font-size:15px">Quantity </strong></p>
                    <p style="font-size:13px"><strong style="font-size:15px">Price</strong> </p>
               </div>
                  
                ${order.orderItems
                  .map(
                    (item) => `
                <div style="background: #fff; padding:2px 5px; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1); margin-bottom:5px;">
                    <div style=" display: grid; grid-template-columns: 2fr 1fr 1fr;">
                    <p style="font-size:13px"> ${item.productId}</p>
                    <p style="font-size:13px; align-text:center;">${item.quantity}</p>
                    <p style="font-size:13px"> Ksh ${item.priceAtOrder}</p>
                    </div>
                </div>
                `
                  )
                  .join("")}
            </div>
            </section>
             <section style="padding: 10px; background: #fff; border-radius: 10px; margin: 10px;">
            <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px">Order Summary</h3>
           
            <p style="font-size:15px"><strong style="font-size:17px">Shipping Price:</strong> Ksh ${
              order.shippingPrice
            }</p>
           
            <p style="font-size:15px"><strong style="font-size:17px">Total Amount:</strong> Ksh ${
              order.totalPrice
            }</p>
            </section>

                <a
            href="https://yourcompany.com/track-order/67e7d077997b3326af86817e"
            class="cta-button" style="
              display: block;
              width: 200px;
              text-align: center;
              background: rgb(248, 97, 9);
              color: white;
              padding: 12px;
              border-radius: 5px;
              text-decoration: none;
              margin: 20px auto;
            "
            >Track Your Order</a
          >

          <p style="text-align:center ; font-size:14px;">
            If you have any questions, contact our support at
            <a href="mailto:beltonvidonyi@gmail.com">support@yourcompany.com</a>
          </p>

          <div style="text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #fff;
            background:rgb(126, 68, 243);           
             text-align: center;         
             border-radius:0 0 5px 5px;
            ">
            <p>&copy; 2025 Developer Belton. All Rights Reserved.</p>
          </div>            
        </div>
        `;
      };
      const user = req.user;
      const orderHtml = generateOrderEmail(order, user);
      console.log("📧 Sending email to:", req.user.email);
      await sendEmail({
        to: req.user.email,
        subject: emailSubject,
        text: emailText,
        html: orderHtml,
      });
      console.log("✅ Email function executed");
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({ order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    next(error); // Pass error to middleware
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }
  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    throw new NotFoundError(`order  with id ${id}  not found`);
  }
  res.status(200).json({ message: `order deleted successfully`, order });
};
const updateOrder = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }

  const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new NotFoundError(`No order with id : ${id}`);
  }

  res.status(200).json({ order });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
