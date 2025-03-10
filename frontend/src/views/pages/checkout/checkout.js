import checkoutShipping from "../../components/checkoutForms/checkoutShipping";
import checkoutSignIn from "../../components/checkoutForms/checkOutSignIn";
import checkoutSignUp from "../../components/checkoutForms/checkoutSignUp";
import "./checkout.css";
import { parseRequestUrl } from "../../../controllers/browserRouter";
import checkoutDelivery from "../../components/checkoutForms/checkoutDelivery";
import checkoutPayment from "../../components/checkoutForms/checkoutPayment";
import checkoutOrder from "../../components/checkoutForms/checkoutOrder";

const checkoutPage = {
  steps: {
    signin: checkoutSignIn,
    signup: checkoutSignUp,
    shipping: checkoutShipping,
    delivery: checkoutDelivery,
    payment: checkoutPayment,
    placeorder: checkoutOrder,
  },
  render() {
    const { id } = parseRequestUrl();
    const stepPage = this.steps[id];
    return `${stepPage.render()}`;
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
