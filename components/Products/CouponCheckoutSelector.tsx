import React, { useState, useEffect } from "react";
import {
  selectCoupon,
  unselectCoupon,
} from "../../redux/reducers/couponSelectedReducer";
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
} from "@mui/material";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { CouponType, PromotionCodeType } from "../../types/couponTypes";
import { RootState } from "../../redux/store";

const CouponCheckoutSelector = ({ code }: any) => {
  const dispatch = useDispatch();
  const couponSelected = useSelector(
    (state: RootState) => state.couponSelected.value
  );
  const image =
    code.code === "FIRST10OFF" ? "/coupon_test_10.png" : "/coupon_test_5.png";

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {};

  const couponSelectHandler = (code: PromotionCodeType) => {
    if (couponSelected.code === code.code) {
      dispatch(unselectCoupon());
    } else {
      dispatch(selectCoupon(code));
    }
  };

  return (
    <Card
      key={code.code}
      sx={couponSelected.code === code.code ? { mb: 1 } : { mb: 1 }}
      onClick={() => couponSelectHandler(code)}
    >
      <CardActionArea sx={{ display: "flex", justifyContent: "space-between" }}>
        <CardMedia sx={{ height: 70, width: 70, flex: 1 }}>
          <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
            <Image
              src={image}
              alt={code.code}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </CardMedia>
        <Divider orientation="vertical" />
        <CardContent sx={{ flex: 3, display: "flex", flexDirection: "column" }}>
          {" "}
          <Typography
            variant="overline"
            sx={
              couponSelected.code === code.code
                ? {
                    lineHeight: "1rem",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }
                : { lineHeight: "1rem" }
            }
          >
            {code.coupon.name}
          </Typography>
          <Typography
            variant="overline"
            sx={
              couponSelected.code === code.code
                ? {
                    lineHeight: "1rem",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }
                : { lineHeight: "1rem" }
            }
          >
            {code.coupon.percent_off}% off
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CouponCheckoutSelector;
