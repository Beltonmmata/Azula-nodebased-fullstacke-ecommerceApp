import "./checkout.css";

// testing example
// const activeLinks = [signin, shipping, delivery];
const checkoutNav = (activeLinks) => {
  const checkoutSteps = [
    {
      page: "signup",
      component: "checkoutSignUp",
      label: "Sign Up",
      url: "/#/checkout/signup",
    },
    {
      page: "signin",
      component: "checkoutSignIn",
      label: "Sign In",
      url: "/#/checkout/signin",
    },

    {
      page: "shipping",
      component: "checkoutShipping",
      label: "Shipping",
      url: "/#/checkout/shipping",
    },
    {
      page: "delivery",
      component: "checkoutDelivery",
      label: "Delivery",
      url: "/#/checkout/delivery",
    },
    {
      page: "payment",
      component: "checkoutPayment",
      label: "Payment",
      url: "/#/checkout/payment",
    },
    {
      page: "placeorder",
      component: "checkoutOrder",
      label: "Order",
      url: "/#/checkout/placeorder",
    },
  ];
  return `    
<div class="navigator-container flex-center-container">

${checkoutSteps
  .slice(1)
  .map((checkoutStep, index) => {
    const { page, label, url } = checkoutStep;
    const isActive = activeLinks.some((link) => link === page);

    if (isActive) {
      return `
    <div class="navigator-item navigator-item-active sign-in flex-center-container">
        <a href="${url}">${label}</a>
    </div>
    `;
    } else {
      return `
        <div class="navigator-item place-order flex-center-container">
        ${label}
        </div>
        `;
    }
  })
  .join(" ")}
</div> 
  `;
};

export default checkoutNav;
