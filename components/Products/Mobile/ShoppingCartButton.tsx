import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const ShoppingCartButton = () => {
  const [itemsInBag, setItemsInBag] = useState(0);
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  useEffect(() => {
    let inBag = 0;
    shoppingCart?.map((item: Item) => {
      inBag += item.quantity;
    });

    setItemsInBag(inBag);
  }, [shoppingCart]); //eslint-disable-line

  if (itemsInBag > 0) {
    return (
      <Button
        color="primary"
        variant="contained"
        sx={{
          position: "fixed",
          width: "70px",
          height: "70px",
          right: 16,
          bottom: 16,
          borderRadius: "100rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShoppingBagOutlined fontSize="large" />
        <Box
          sx={{
            position: "fixed",
            ml: 3,
            mb: 3,
            backgroundColor: "white",
            width: 15,
            height: 15,
            borderRadius: "100rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
          }}
        >
          <Typography
            variant="caption"
            color="primary"
            sx={{ p: 0, lineHeight: 0, fontWeight: 600 }}
          >
            {itemsInBag}
          </Typography>
        </Box>
      </Button>
    );
  } else {
    return <Box></Box>;
  }
};

export default ShoppingCartButton;
