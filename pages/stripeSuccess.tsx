import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import { removeItem } from "../redux/reducers/shoppingCartReducer";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { removeShipping } from "../redux/reducers/guestAddresReducer";

const StripeSuccess = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const saveAddress = useSelector(
    (state: RootState) => state.guestShipping.saveAddress
  );

  useEffect(() => {
    if (shoppingCart.length <= 0) {
      router.push("/products");
    }
  }, [shoppingCart]); //eslint-disable-line

  useEffect(() => {
    if (shoppingCart.length > 0 && session.status !== "loading") {
      fetch("/api/products", {
        method: "PATCH",
        body: JSON.stringify({ items: shoppingCart }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (!saveAddress) {
              dispatch(
                removeShipping({
                  name: "",
                  address: {
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    country: "US",
                  },
                })
              );
            }

            setTimeout(() => {
              dispatch(removeItem([]));
            }, 2000);

            console.log(data.res, data.items);
          });
        }
      });
    }
  }, [session.status]); //eslint-disable-line

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
      <Typography>You&apos;ll be redirected in a few seconds</Typography>
      <Typography>Click here if page does not redirect</Typography>
    </Container>
  );
};

export default StripeSuccess;
