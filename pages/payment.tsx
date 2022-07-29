import React, { SetStateAction, useEffect, useState } from "react";
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

type Address = {
  name: string;
  address: {
    line1: string;
    line2: string | "";
    city: string;
    state: string;
    postal_code: string;
  };
};

const Payment = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const storedShipping = useSelector(
    (state: RootState) => state.guestShipping.value
  );
  const isMobile = useMediaQuery("(max-width: 900px)");
  const session = useSession();
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

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

  const shippingData = user.userData.id
    ? {
        name: user.userData.firstName,
        address: {
          line1: user.userData.address1,
          line2: user.userData.address2,
          city: user.userData.city,
          state: user.userData.state,
          postal_code: user.userData.zipcode,
        },
      }
    : storedShipping;

  useEffect(() => {
    // The items the customer wants to buy
    const cardItemsId = shoppingCart.map((item) => item.id);

    // @ts-ignore

    const customerId = user.userData.id ? user.userData.id : undefined;

    // Create Order as soon as the page loads
    fetch("/api/create_payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: shoppingCart,
        ids: cardItemsId,
        shipping: shippingData,
        customerId: customerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStripeLoaded(true);
        setClientSecret(data.clientSecret);
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
                Name: {shippingData.name}
              </Typography>
              <Typography variant="overline">Email: {storedEmail}</Typography>
              <Typography variant="overline">
                Address: {shippingData.address.line1}
              </Typography>
              <Typography variant="overline">
                Apt / Room #: {shippingData.address.line2}
              </Typography>
              <Typography variant="overline">
                City: {shippingData.address.city}
              </Typography>
              <Typography variant="overline">
                State: {shippingData.address.state}
              </Typography>
              <Typography variant="overline">
                Zipcode: {shippingData.address.postal_code}
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
                    Name: {shippingData.name}
                  </Typography>
                  <Typography variant="overline">
                    Email: {storedEmail}
                  </Typography>
                  <Typography variant="overline">
                    Address: {shippingData.address.line1}
                  </Typography>
                  <Typography variant="overline">
                    Apt / Room #: {shippingData.address.line2}
                  </Typography>
                  <Typography variant="overline">
                    City: {shippingData.address.city}
                  </Typography>
                  <Typography variant="overline">
                    State: {shippingData.address.state}
                  </Typography>
                  <Typography variant="overline">
                    Zipcode: {shippingData.address.postal_code}
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
          </Paper>
        </Box>
      )}
    </Box>
  );
};

import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { server } from "../config";
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
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27; orders_beta=v4",
  });

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      props: { session: session },
    };
  }
  const user = session.user as UserDataType;

  const dbRes = await fetch(`${server}/api/users/${user.id}`);

  const userData = await dbRes.json();

  return {
    props: { user: userData },
  };
};

export default Payment;
