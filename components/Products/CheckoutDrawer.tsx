import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Button, Divider } from "@mui/material";
import { RootState } from "../../redux/store";
import ItemInCheckoutDrawer from "./ItemInCheckoutDrawer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import GuestAddressInput from "./GuestAddressInput";

const CheckoutDrawer = () => {
  const router = useRouter();
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const session = useSession();
  const [guestShippingForm, setGuestShippingForm] = useState(false);

  const subtotal = shoppingCart.reduce((total: number, item: any) => {
    return (total += item.price * item.quantity);
  }, 0);

  const shipping = 0;

  const total = Math.floor(subtotal * 1.086 * 100) / 100 + shipping;

  const shoppingCartCheckout = shoppingCart.map((product: any) => {
    return <ItemInCheckoutDrawer product={product} key={product.name} />;
  });

  const checkoutRouterHandler = () => {
    if (session.status === "authenticated") {
      router.push("/payment");
    } else {
      setGuestShippingForm(true);
    }
  };

  return (
    <Paper
      sx={
        guestShippingForm
          ? {
              width: 500,
              height: "100vh",

              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }
          : {
              width: 400,
              height: "100vh",

              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }
      }
      square
    >
      {guestShippingForm ? (
        <GuestAddressInput setGuestShippingForm={setGuestShippingForm} />
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3f312b",
              pb: 2,
            }}
          >
            <Typography variant="h4" color="white" sx={{ fontWeight: 100 }}>
              Your bag
            </Typography>
          </Box>
          <Box
            sx={{ width: "100%", height: "78vh", p: 2, overflowY: "scroll" }}
          >
            {shoppingCartCheckout}
          </Box>
          <Divider />

          <Box sx={{ p: 2 }}>
            <Typography>+ Apply promo code or coupon</Typography>
          </Box>
          <Divider />
          <Box sx={{ width: "100%", height: "22vh", m: 2 }}>
            <Typography>Subtotal: ${subtotal}.00</Typography>
            <Typography>Shipping: ${shipping}</Typography>
            <Typography>Tax: --- (Calculated at checkout)</Typography>
            <Typography sx={{ fontWeight: 600 }}>Total: ${total}</Typography>
            <Typography>Tax and promotions calculated in checkout.</Typography>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                sx={{ width: "80%", height: 60, mt: 2 }}
                onClick={() => checkoutRouterHandler()}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default CheckoutDrawer;
