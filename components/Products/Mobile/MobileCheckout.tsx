import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import React from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import MobileCheckoutContent from "./MobileCheckoutContent";

const MobileCheckout = () => {
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  const cartContent = shoppingCart.map((product: any) => {
    return <MobileCheckoutContent product={product} key={product.name} />;
  });

  const subtotal = shoppingCart.reduce((total: number, item: any) => {
    return (total += item.price * item.quantity);
  }, 0);

  const shipping = 0;

  const total = Math.floor(subtotal * 1.086 * 100) / 100 + shipping;

  return (
    <Paper
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      square
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Your bag</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          height: "60%",
          pl: 1,
          pr: 1,
          overflowY: "scroll",
        }}
      >
        {cartContent}
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography>+ Apply promo code or coupon</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="overline" sx={{ lineHeight: 1.5, mt: 1 }}>
            Subtotal: ${subtotal}.00
          </Typography>
          <Typography sx={{ lineHeight: 1.5 }} variant="overline">
            Shipping: ${shipping}
          </Typography>
          <Typography sx={{ lineHeight: 1.5 }} variant="overline">
            Tax: --- (Calculated at checkout)
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Typography variant="overline" sx={{ lineHeight: 1.5, mt: 1 }}>
            Shipping and tax are calculated at checkout
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "27%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            pl: 1,
          }}
        >
          <Typography
            variant="overline"
            sx={{ fontWeight: 600, lineHeight: 1.5, fontSize: "1rem" }}
          >
            Estimated Total: ${total}
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="overline"
            sx={{ color: "#949495", lineHeight: 1, fontSize: ".5rem" }}
          >
            By checking out, I agree to the Terms of Use and acknowledge that I
            have read the Privacy Policy.
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "35%" }}>
          <Button variant="contained" fullWidth sx={{ height: "100%" }}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MobileCheckout;
