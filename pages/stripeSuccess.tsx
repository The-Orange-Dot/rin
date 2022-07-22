import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import { removeItem } from "../redux/reducers/shoppingCartReducer";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

const StripeSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  useEffect(() => {
    if (shoppingCart.length <= 0) {
      // router.push("/products");
    } else {
      setTimeout(() => {
        dispatch(removeItem([]));
      }, 5000);
    }
  }, [shoppingCart]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography>Thank you very much for your purchase</Typography>
      <Typography>You'll be redirected in a few seconds</Typography>
      <Typography>Click here if page does not redirect</Typography>
    </Container>
  );
};

export default StripeSuccess;
