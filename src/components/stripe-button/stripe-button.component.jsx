import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = (props) => {
  const { price } = props;
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_6wo816xAVh1pZrrn0VsZFuvn";

  const onToken = (token) => {
    console.log(token);
    alert("payment successful" + JSON.stringify(token));
  };

  return (
    <StripeCheckout
      amount={priceForStripe}
      label="Pay Now"
      name="CRWN Clothing LTD."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      panelLabel="Pau Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
