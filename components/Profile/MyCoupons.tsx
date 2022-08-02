import {
  Box,
  Card,
  Paper,
  Typography,
  Grid,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PromotionCodeType } from "../../types/couponTypes";
import gsap from "gsap";
import { useMediaQuery } from "@mui/material";

const MyCoupons = ({ user }: any) => {
  const [codes, setCodes] = useState([]);
  const [usedCodes, setUsedCodes] = useState([]);
  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    fetchCoupons();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (document.querySelector(".coupon-cards")) {
      gsap.to(".coupon-cards", { opacity: 1, y: 0, stagger: 0.1 });
    }
  }, [document.querySelector(".coupon-cards")]); //eslint-disable-line

  const fetchCoupons = async () => {
    if (document.querySelector(".coupon-cards")) {
      gsap.set(".coupon-cards", { opacity: 0, y: -10 });
    }
    const res = await fetch("/api/coupons");
    const promotionalCodes = await res.json();
    setCodes(promotionalCodes.codes);
    setUsedCodes(promotionalCodes.usedCodes);
  };

  const couponCards = codes.map((code: PromotionCodeType) => {
    const couponImage =
      code.code === "FIRST10OFF" ? "/coupon_test_10.png" : "/coupon_test_5.png";

    return (
      <Grid item key={code.id} xs={isMobile ? 6 : 4}>
        <Card className="coupon-cards" sx={{ opacity: 0 }}>
          <CardActionArea disabled>
            <CardMedia
              sx={
                isMobile
                  ? { width: "100%", height: 125 }
                  : { width: "100%", height: 250 }
              }
            >
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={couponImage}
                  alt={couponImage}
                  layout="fill"
                  objectFit="cover"
                  quality={50}
                />
              </Box>
            </CardMedia>
            <CardContent sx={{ minHeight: 50 }}>
              <Typography
                variant="overline"
                sx={{ lineHeight: "1rem", fontSize: ".6rem" }}
              >
                {code?.coupon?.name} - add this coupon in your shopping cart to
                receive {code?.coupon?.percent_off}% your next purchase.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  const usedCoupons = usedCodes.map((code: PromotionCodeType) => {
    const couponImage =
      code.code === "FIRST10OFF" ? "/coupon_test_10.png" : "/coupon_test_5.png";

    return (
      <Grid item key={code.id} xs={isMobile ? 6 : 4}>
        <Card className="coupon-cards" sx={{ opacity: 0 }}>
          <CardActionArea
            disabled
            sx={{ position: "relative", backgroundColor: "rgba(0,0,0,.6)" }}
          >
            <Typography
              sx={{
                position: "absolute",
                left: "0%",
                right: "0%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                top: "30%",
                zIndex: 1,
                color: "white",
                opacity: 0.2,
                transform: "rotate(-45deg)",
              }}
              variant="h2"
              fontWeight={600}
            >
              Used
            </Typography>
            <CardMedia
              sx={
                isMobile
                  ? { width: "100%", height: 125 }
                  : { width: "100%", height: 250 }
              }
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  opacity: 0.4,
                }}
              >
                <Image
                  src={couponImage}
                  alt={couponImage}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
            </CardMedia>
            <CardContent sx={{ minHeight: 50 }}>
              <Typography
                variant="overline"
                sx={{ lineHeight: "1rem", fontSize: ".6rem" }}
              >
                {code?.coupon?.name} - add this coupon in your shopping cart to
                receive {code?.coupon?.percent_off}% your next purchase.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  return (
    <Box sx={isMobile ? { m: 1 } : {}}>
      <Grid container spacing={2}>
        {couponCards}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {usedCoupons}
      </Grid>
    </Box>
  );
};

export default MyCoupons;
