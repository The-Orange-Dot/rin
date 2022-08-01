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

const MyCoupons = ({ user }: any) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []); //eslint-disable-line

  const fetchCoupons = async () => {
    const res = await fetch("/api/coupons");
    const promotionalCodes = await res.json();
    console.log(promotionalCodes.codes);
    setCodes(promotionalCodes.codes);
  };

  const couponCards = codes.map((code: PromotionCodeType) => {
    const couponImage =
      code.code === "FIRST10OFF" ? "/coupon_test_10.png" : "/coupon_test_5.png";

    return (
      <Grid item key={code.id} xs={4}>
        <Card>
          <CardActionArea>
            <CardMedia sx={{ width: "100%", height: 250 }}>
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={couponImage}
                  alt={couponImage}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
            </CardMedia>
            <CardContent>
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
    <div>
      <Grid container spacing={2}>
        {couponCards}
      </Grid>
    </div>
  );
};

export default MyCoupons;
