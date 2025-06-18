import checkoutShipping from "../../components/checkoutForms/checkout-shipping";

import checkoutSignUp from "../../components/checkoutForms/checkout-sign-up";
import "./checkout.css";
import { parseRequestUrl } from "../../../controllers/browserRouter";
import checkoutDelivery from "../../components/checkoutForms/checkout-delivery";
import checkoutPayment from "../../components/checkoutForms/checkout-payment";
import checkoutOrder from "../../components/checkoutForms/checkout-order";
import checkoutSignIn from "../../components/checkoutForms/checkout-sign-in";

const checkoutPage = {
  steps: {
    signin: checkoutSignIn,
    signup: checkoutSignUp,
    shipping: checkoutShipping,
    delivery: checkoutDelivery,
    payment: checkoutPayment,
    placeorder: checkoutOrder,
  },
  render: async () => {
    const { id } = parseRequestUrl();
    const stepPage = checkoutPage.steps[id];

    if (!stepPage) {
      return `<h2>Invalid Checkout Step</h2>`;
    }

    return stepPage.render ? await stepPage.render() : "";
  },

  afterRender: async () => {
    const { id } = parseRequestUrl();
    const stepPage = checkoutPage.steps[id];
    if (stepPage.afterRender) {
      await stepPage.afterRender();
    }
  },
};
export default checkoutPage;
