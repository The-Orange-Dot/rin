import { Box, Paper, Typography } from "@mui/material";
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
    return (
      <Paper>
        <Box>
          <Typography>{code?.coupon?.name}</Typography>
        </Box>
      </Paper>
    );
  });

  return <div>{couponCards}</div>;
};

export default MyCoupons;
