import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CheckoutForm() {
  const router = useRouter();
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const storedEmail = useSelector((state) => state.guestShipping.email);
  const email =
    session.status === "authenticated" ? session.data.user.email : storedEmail;

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    //const { error } =
    await stripe
      .processOrder({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/stripeSuccess",
          receipt_email: email,
        },
      })
      .then((res) => {
        console.log(res.error.message);

        // if (
        //   res.error.type === "card_error" ||
        //   res.error.type === "validation_error"
        // ) {
        //   setMessage(res.error.message);
        // } else {
        //   setMessage("An unexpected error occurred.");
        // }
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Box sx={{ width: "100%", minHeight: "24vh" }}>
        <PaymentElement id="payment-element" />
      </Box>
      <Button
        type="submit"
        sx={{ mt: 3, height: 50 }}
        fullWidth
        variant="contained"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      <Button
        color="secondary"
        sx={{ mt: 2, height: 50 }}
        fullWidth
        variant="contained"
        onClick={() => router.push("/products")}
      >
        Back
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
