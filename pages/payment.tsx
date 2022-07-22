import React, { useEffect, useState } from "react";
import styles from "../styles/payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Products/CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Paper, Input, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCartItems from "../components/PaymentCartItems";
import { useSession } from "next-auth/react";

type UserDataType = {
  address: string;
  city: string;
  country: string;
  email: string;
  id: string;
  image: string;
  lastName: string;
  name: string;
  username: string;
  zipcode: string;
  state: string;
};

const Payment = () => {
  const session = useSession();
  const [shippingDetails, setShippingDetails] = useState({});
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  const stripePromise = loadStripe(
    // @ts-ignore
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    {
      betas: ["process_order_beta_1"],
      apiVersion: "2020-08-27; orders_beta=v4",
    }
  );

  useEffect(() => {
    // The items the customer wants to buy
    const cardItemsId = shoppingCart.map((item) => item.id);

    if (session.status !== "loading") {
      // @ts-ignore

      const user: UserDataType = session.data?.user;

      const shippingData = {
        name: `${user?.name} ${user?.lastName}`,
        address: {
          line1: user?.address,
          city: user?.city,
          state: user?.state,
          postal_code: user?.zipcode,
          country: user?.country,
        },
      };
      // Create Order as soon as the page loads
      fetch("/api/create_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: shoppingCart,
          ids: cardItemsId,
          shipping: shippingData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setShippingDetails(data.shipping);
          setTotal(data.total);
        });
    }
  }, [session.status]);

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

  // const total = shoppingCart.reduce((total: number, item: any) => {
  //   return (total += item.price * item.quantity);
  // }, 0);

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
                  {`$${(total / 100).toFixed(2)}`}
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
                <CheckoutForm shoppingCart={shoppingCart} />
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
