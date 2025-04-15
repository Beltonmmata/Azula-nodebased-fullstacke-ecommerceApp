const generateOrderEmail = (order, user, emailText) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; background:hsl(36, 33%, 94%); box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5)">
      <header style="background:rgb(126, 68, 243); color: #fff; padding: 30px 10px; text-align: center; font-size: 20px; border-radius:5px 5px 0 0;">
        Order Confirmation - Thank You for Your Order!
      </header>

      <section style="padding: 10px; margin:10px;">${emailText}</section>

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
          order.paymentMethod
        }</p>
        <p style="font-size:13px"><strong style="font-size:15px">Delivery Option:</strong> ${
          order.deliveryOption.deliveryName
        }</p>
        <p style="font-size:13px"><strong style="font-size:15px">Estimated Delivery:</strong> ${
          order.deliveryOption.deliveryDays
        } days</p>
      </section>

      <section style="padding: 10px; background: #f9f9f9; border-radius: 10px; margin: 10px;">
        <h3 style="color:rgb(126, 68, 243); margin:0; padding:0; font-size:18px">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f1f1f1;">
              <th style="text-align: left; padding: 6px;">Product ID</th>
              <th style="text-align: center; padding: 6px;">Quantity</th>
              <th style="text-align: right; padding: 6px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.orderItems
              .map(
                (item) => `
              <tr style="border-top: 1px solid #ddd;">
                <td style="padding: 6px;">${item.productId}</td>
                <td style="padding: 6px; text-align: center;">${item.quantity}</td>
                <td style="padding: 6px; text-align: right;">Ksh ${item.priceAtOrder}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
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

      <a href="${process.env.CLIENT_URL}/#/trackorder?orderId=${order._id}"
        style="display: block; width: 200px; text-align: center; background: rgb(248, 97, 9); color: white; padding: 12px; border-radius: 5px; text-decoration: none; margin: 20px auto;">
        Track Your Order
      </a>

      <p style="text-align:center; font-size:14px;">
        If you have any questions, contact our support at
        <a href="mailto:beltonvidonyi@gmail.com">beltonvidonyi@gmail.com</a>
      </p>

      <div style="text-align: center; padding: 10px; font-size: 12px; color: #fff; background:rgb(126, 68, 243); border-radius:0 0 5px 5px;">
        <p>&copy; 2025 Developer Belton. All Rights Reserved.</p>
      </div>
    </body>
    </html>
  `;
};
module.exports = generateOrderEmail;
