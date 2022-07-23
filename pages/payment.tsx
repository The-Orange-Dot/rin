import React, { useEffect, useState } from "react";
import styles from "../styles/payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Products/CheckoutForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Paper, Input, Typography, Divider, Button } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCartItems from "../components/PaymentCartItems";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import MobilePaymentCartItems from "../components/Products/Mobile/MobilePaymentCartItems";

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
  const isMobile = useMediaQuery("(max-width: 900px)");
  const session = useSession();
  const [shippingDetails, setShippingDetails] = useState({});
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const storedShipping = useSelector(
    (state: RootState) => state.guestShipping.value
  );
  const storedEmail = useSelector(
    (state: RootState) => state.guestShipping.email
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

    // @ts-ignore

    const user: UserDataType = session.data?.user;

    const shippingData =
      session.status === "authenticated"
        ? {
            name: `${user?.name} ${user?.lastName}`,
            address: {
              line1: user?.address,
              city: user?.city,
              state: user?.state,
              postal_code: user?.zipcode,
              country: user?.country,
            },
          }
        : storedShipping;

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
        setStripeLoaded(true);
        setClientSecret(data.clientSecret);
        setShippingDetails(data.shipping);
        setTotal(data.total);
      });
  }, [session.status]); //eslint-disable-line

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
    return isMobile ? (
      <MobilePaymentCartItems product={product} key={product.name} />
    ) : (
      <PaymentCartItems product={product} key={product.name} />
    );
  });

  // const total = shoppingCart.reduce((total: number, item: any) => {
  //   return (total += item.price * item.quantity);
  // }, 0);

  return (
    <Box className={styles.main}>
      {isMobile ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="overline" sx={{ mt: 1 }}>
              Purchase Confirmation
            </Typography>

            <Typography
              variant="overline"
              sx={{ fontSize: "1.2rem", lineHeight: "1rem", fontWeight: 600 }}
            >
              {`$${(total / 100).toFixed(2)}`}
            </Typography>
            <Typography
              variant="overline"
              color="secondary"
              sx={{ fontSize: ".7rem", lineHeight: "1.2rem" }}
            >
              {shoppingCart.length} Items
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "100%", p: 2 }}>
            {cartContent}
            <Divider />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                pl: 2,
              }}
            >
              <Typography
                variant="overline"
                sx={{ alignSelf: "center", mt: 1, mb: 1, pr: 2 }}
              >
                Shipping Address
              </Typography>
              <Typography variant="overline">
                Name: {storedShipping.name}
              </Typography>
              <Typography variant="overline">Email: {storedEmail}</Typography>
              <Typography variant="overline">
                Address: {storedShipping.address.line1}
              </Typography>
              <Typography variant="overline">
                Apt / Room #: {storedShipping.address.line2}
              </Typography>
              <Typography variant="overline">
                City: {storedShipping.address.city}
              </Typography>
              <Typography variant="overline">
                State: {storedShipping.address.state}
              </Typography>
              <Typography variant="overline">
                Zipcode: {storedShipping.address.postal_code}
              </Typography>
            </Box>
          </Box>

          <Paper
            sx={
              mobileDrawer
                ? {
                    width: "100%",
                    height: "8%",
                    pt: 2,
                    position: "fixed",
                    bottom: 0,
                    transition: ".3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }
                : {
                    width: "100%",
                    height: "58%",
                    pt: 2,
                    position: "fixed",
                    bottom: 0,
                    transition: ".3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }
            }
            elevation={8}
          >
            <Button
              onClick={() => {
                setMobileDrawer(!mobileDrawer);
              }}
              sx={{ mb: 2 }}
            >
              {mobileDrawer ? "Show Card Form" : "Hide Card Form"}
            </Button>
            {clientSecret && (
              // @ts-ignore
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </Paper>
        </Box>
      ) : (
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
            <Box
              sx={
                stripeLoaded
                  ? {
                      width: "70%",
                      minHeight: "50vh",
                      opacity: 1,
                      transition: "0.3s",
                    }
                  : { width: "70%", minHeight: "50vh", opacity: 0 }
              }
            >
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
              height: "100vh",
              width: "40%",
              minWidth: 500,
              maxWidth: 600,
              p: 5,
              pl: 10,
              pr: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={
                stripeLoaded
                  ? {
                      width: "100%",
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 1,
                      transition: "0.3s",
                    }
                  : {
                      width: "100%",
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                    }
              }
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: "40%",
                  mb: 3,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    alignSelf: "center",
                    mt: 1,
                    mb: 1,
                    pr: 2,
                  }}
                >
                  Shipping Address
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="overline">
                    Name: {storedShipping.name}
                  </Typography>
                  <Typography variant="overline">
                    Email: {storedEmail}
                  </Typography>
                  <Typography variant="overline">
                    Address: {storedShipping.address.line1}
                  </Typography>
                  <Typography variant="overline">
                    Apt / Room #: {storedShipping.address.line2}
                  </Typography>
                  <Typography variant="overline">
                    City: {storedShipping.address.city}
                  </Typography>
                  <Typography variant="overline">
                    State: {storedShipping.address.state}
                  </Typography>
                  <Typography variant="overline">
                    Zipcode: {storedShipping.address.postal_code}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%" }}>
                {clientSecret && (
                  // @ts-ignore
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                )}
              </Box>
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
      )}
    </Box>
  );
};

export default Payment;
