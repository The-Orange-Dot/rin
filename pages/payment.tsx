import React, { useEffect, useState } from "react";
import styles from "../styles/payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Products/CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Paper, Input, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCartItems from "../components/PaymentCartItems";

const Payment = () => {
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    // @ts-ignore
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const appearance = {
    theme: "stripe",
    variables: { colorPrimary: "#3f312b" },
    rules: {
      ".Input": {
        border: "1px solid #949495",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },
      ".Label": {
        color: "#949495",
      },
      ".Input:hover": {
        border: "1px solid black",
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  const cartContent = shoppingCart.map((product) => {
    return <PaymentCartItems product={product} key={product.name} />;
  });

  const total = shoppingCart.reduce((total: number, item: any) => {
    return (total += item.price * item.quantity);
  }, 0);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const cardItemsId = shoppingCart.map((item) => item.id);
    fetch("/api/create_payment_intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: shoppingCart, ids: cardItemsId }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <Box className={styles.main}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "70%", minHeight: "50vh" }}>
            <Box
              sx={{
                width: "100%",
                height: "25vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Typography
                color="primary"
                sx={{
                  width: "100%",
                  fontWeight: 200,
                  cursor: "pointer",
                  letterSpacing: 4,
                  fontSize: "2.5rem",
                }}
                variant="h4"
              >
                rin
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="overline"
                  sx={{ fontSize: "2rem", lineHeight: "3rem" }}
                >
                  {total.toString().includes(".")
                    ? `$${total}`
                    : `$${total}.00`}
                </Typography>
                <Typography
                  variant="overline"
                  color="secondary"
                  sx={{ fontSize: "1rem", lineHeight: "1.2rem" }}
                >
                  {shoppingCart?.length} items
                </Typography>
              </Box>
            </Box>
            {cartContent}
          </Box>
        </Box>

        {/* Right Side */}
        <Paper
          elevation={5}
          sx={{
            width: "40%",
            minWidth: 500,
            maxWidth: 600,
            p: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {clientSecret && (
              // @ts-ignore
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{ fontSize: ".7rem", lineHeight: 0.5, mt: 5 }}
            >
              Powered by
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable */}
            <img src="/stripe_logo_small.png" alt="Stripe Logo" width={100} />
            {/* eslint-enable */}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Payment;
