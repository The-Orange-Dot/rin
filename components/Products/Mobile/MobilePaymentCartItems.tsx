import React, { useState } from "react";
import { Paper, Box, Typography, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  editQuantity,
  removeItem,
} from "../../../redux/reducers/shoppingCartReducer";
import { RootState } from "../../../redux/store";
import styles from "../../../styles/payment.module.css";

const MobilePaymentCartItems = ({ product }: any) => {
  console.log(product);
  return (
    <Box
      key={product.name}
      sx={{
        width: "100%",
        height: "12vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 2,
            height: "100%",
            objectFit: "contained",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* eslint-disable */}
          <img src={product.image} width={70} height={70} alt={product.name} />
          {/* eslint-enable */}
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            ml: 1,
            flex: 4,
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                fontWeight: "bold",
                fontSize: ".6rem",
                lineHeight: ".5rem",
              }}
            >
              {product.name}
            </Typography>
          </Box>
          {product?.detail !== "" ? (
            <Box>
              <Typography
                sx={{ lineHeight: ".5rem", fontSize: ".5rem" }}
                variant="overline"
              >
                {product.details}
              </Typography>
            </Box>
          ) : null}
          <Typography
            variant="overline"
            sx={{ lineHeight: "1rem", color: "#949495", fontSize: ".5rem" }}
          >
            {product.size}, Qty: {product.quantity} - ${product.price} per unit
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="overline"
            sx={{ fontSize: ".9rem", fontWeight: "bold" }}
          >
            ${product.price * product.quantity}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MobilePaymentCartItems;
