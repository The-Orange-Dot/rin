import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductsNavBar = () => {
  return (
    <Container
      sx={{
        width: "100%",
        flex: "display",
        justifyContent: "space-between",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Typography>Bath</Typography>
          <Typography>Skincare</Typography>
          <Typography>Haircare</Typography>
          <Typography>Lotion</Typography>
        </Box>
        <ShoppingCartIcon />
      </Container>
    </Container>
  );
};

export default ProductsNavBar;
