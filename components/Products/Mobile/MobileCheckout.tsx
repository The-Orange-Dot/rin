import { Paper, Box, Typography, Divider, Button, styled } from "@mui/material";
import React, { useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import MobileCheckoutContent from "./MobileCheckoutContent";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MobileGuestAddressForm from "./MobileGuestAddressForm";
import CouponCheckoutSelector from "../CouponCheckoutSelector";
import { PromotionCodeType } from "../../../types/couponTypes";
import { Dollars } from "../../MoneyFormatter";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";

const StyledTypography = styled((props: TypographyProps) => (
  <MuiTypography {...props} variant="overline" />
))(() => ({
  lineHeight: "1rem",
}));

const MobileCheckout = ({ setOpenDrawer, openDrawer }: any) => {
  const [guestShippingForm, setGuestShippingForm] = useState(false);
  const router = useRouter();
  const session = useSession();
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const couponSelected = useSelector(
    (state: RootState) => state.couponSelected.value
  );
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  const checkoutRouterHandler = () => {
    if (session.status === "authenticated") {
      router.push("/payment");
    } else {
      setGuestShippingForm(true);
    }
  };

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

  const cartContent = shoppingCart.map((product: any) => {
    return <MobileCheckoutContent product={product} key={product.name} />;
  });

  const subtotal = shoppingCart.reduce((total: number, item: any) => {
    return (total += item.price * item.quantity);
  }, 0);

  const shipping = 0;

  const tax = 1;

  const beforeDiscount = Math.ceil(subtotal * tax * 100) / 100 + shipping;

  const couponSaved =
    Math.ceil(
      beforeDiscount * (couponSelected?.coupon?.percent_off / 100) * 100
    ) / 100;

  const total = beforeDiscount - couponSaved;

  return (
    <Paper
      sx={
        guestShippingForm
          ? {
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: ".3s",
            }
          : {
              width: "100%",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }
      }
      square
    >
      {guestShippingForm ? (
        <MobileGuestAddressForm
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      ) : (
        <>
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
              pb: 2,
              overflowY: "scroll",
            }}
          >
            <Box sx={{ minHeight: "35vh", width: "100%" }}>{cartContent}</Box>
            <Divider />
            <Box
              sx={
                couponOpen
                  ? {
                      p: 2,
                      height: "40vh",
                      overflowY: "scroll",
                      transition: ".2s",
                    }
                  : { p: 2, transition: ".2s" }
              }
            >
              <Box sx={{ height: "10%" }}>
                <Typography
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
                    ? { height: "90%", transition: ".2s", overflowY: "scroll" }
                    : { height: 0, transition: ".2s" }
                }
              >
                {couponOpen ? coupons : null}
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledTypography sx={{ mt: 1 }}>
                Subtotal: {Dollars(subtotal)}
              </StyledTypography>
              <StyledTypography>
                Shipping: ${shipping} (Add this logic later)
              </StyledTypography>
              <StyledTypography>
                Tax: --- (Calculated at checkout)
              </StyledTypography>
              <StyledTypography>
                Promotion/Coupon: {couponSelected?.coupon?.percent_off}% off{" "}
                {couponSaved === 0
                  ? ""
                  : `(You'll Save: ${Dollars(couponSaved)})`}
              </StyledTypography>
            </Box>
            <Divider />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "30%",
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
                Estimated Total: {Dollars(total)} + tax
              </Typography>
            </Box>
            <Box>
              <StyledTypography sx={{ mt: 1, fontSize: ".65rem", pl: 1 }}>
                Final shipping and tax are calculated at checkout
              </StyledTypography>
            </Box>
            <Box sx={{ p: 1 }}>
              <StyledTypography sx={{ color: "#949495", fontSize: ".5rem" }}>
                By checking out, I agree to the Terms of Use and acknowledge
                that I have read the Privacy Policy.
              </StyledTypography>
            </Box>
            <Box sx={{ width: "100%", height: "35%" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
                onClick={() => checkoutRouterHandler()}
              >
                {session.status === "authenticated"
                  ? "Checkout"
                  : "Continue as Guest"}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default MobileCheckout;
