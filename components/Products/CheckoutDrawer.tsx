import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  styled,
} from "@mui/material";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { RootState } from "../../redux/store";
import ItemInCheckoutDrawer from "./ItemInCheckoutDrawer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import GuestAddressInput from "./GuestAddressInput";
import NoAddressForm from "./NoAddressHandler";
import CouponCheckoutSelector from "./CouponCheckoutSelector";
import { PromotionCodeType } from "../../types/couponTypes";

const StyledTypography = styled((props: TypographyProps) => (
  <MuiTypography {...props} variant="overline" />
))(() => ({
  lineHeight: "1rem",
}));

const CheckoutDrawer = () => {
  const router = useRouter();
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const couponSelected = useSelector(
    (state: RootState) => state.couponSelected.value
  );

  const { data: session, status } = useSession();
  const [guestShippingForm, setGuestShippingForm] = useState(false);
  const [noAddressForm, setNoAddressForm] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const subtotal = shoppingCart.reduce((total: number, item: any) => {
    return (total += item.price * item.quantity);
  }, 0);

  const shipping = 0;

  const beforeDiscount = Math.ceil(subtotal * 1.086 * 100) / 100 + shipping;

  const couponSaved =
    Math.ceil(
      beforeDiscount * (couponSelected?.coupon?.percent_off / 100) * 100
    ) / 100;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const total = formatter.format(beforeDiscount - couponSaved);

  const shoppingCartCheckout = shoppingCart.map((product: any) => {
    return <ItemInCheckoutDrawer product={product} key={product.name} />;
  });

  const couponHandler = async () => {
    setCouponOpen(!couponOpen);
    if (!couponOpen) {
      const res = await fetch("/api/coupons");
      const coupons = await res.json();
      if (coupons) {
        const couponCards = coupons.codes.map((code: PromotionCodeType) => {
          return <CouponCheckoutSelector code={code} key={code.id} />;
        });
        setCoupons(couponCards);
      }
    }
  };

  const checkoutRouterHandler = () => {
    if (session) {
      fetch(`/api/users/${session.id}`).then((res) => {
        if (res.ok) {
          router.push("/payment");
        } else {
          setNoAddressForm(true);
        }
      });
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
        <GuestAddressInput
          guestShippingForm={guestShippingForm}
          setGuestShippingForm={setGuestShippingForm}
        />
      ) : noAddressForm ? (
        <NoAddressForm
          noAddressForm={noAddressForm}
          setNoAddressForm={setNoAddressForm}
          user={session}
        />
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
            sx={
              couponOpen
                ? {
                    width: "100%",
                    height: "53vh",
                    p: 2,
                    overflowY: "scroll",
                    transition: ".2s",
                  }
                : {
                    width: "100%",
                    height: "78vh",
                    p: 2,
                    overflowY: "scroll",
                    transition: ".2s",
                  }
            }
          >
            {shoppingCartCheckout}
          </Box>
          <Divider />

          <Box
            sx={
              couponOpen
                ? { p: 2, height: "31vh", transition: ".2s" }
                : { p: 2, height: "6vh", transition: ".2s" }
            }
          >
            <Box sx={{ height: "10%" }}>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  couponHandler();
                }}
              >
                + Apply promo code or coupon
              </Typography>
            </Box>
            <Box
              sx={
                couponOpen
                  ? {
                      height: "90%",
                      transition: ".2s",
                      overflowY: "scroll",
                    }
                  : {
                      height: "0",
                      transition: ".2s",
                    }
              }
            >
              {couponOpen ? coupons : null}
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              width: "100%",
              height: "22vh",
              m: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledTypography>
              Subtotal: {formatter.format(subtotal)}
            </StyledTypography>
            <StyledTypography>Shipping: ${shipping}</StyledTypography>
            <StyledTypography>
              Tax: --- (Calculated at checkout)
            </StyledTypography>
            <StyledTypography>
              Promotion/Coupon: {couponSelected?.coupon?.percent_off}% off{" "}
              {couponSaved === 0
                ? ""
                : `(You
              saved ${formatter.format(couponSaved)})`}
            </StyledTypography>
            <StyledTypography sx={{ fontWeight: 600, fontSize: ".9rem" }}>
              Estimated Total: {total}
            </StyledTypography>
            <StyledTypography color="secondary" sx={{ fontSize: ".6rem" }}>
              Your final total will be calculated at checkout.
            </StyledTypography>
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
