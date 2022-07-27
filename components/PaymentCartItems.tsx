import React, { useState } from "react";
import { Paper, Box, Typography, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  editQuantity,
  removeItem,
} from "../redux/reducers/shoppingCartReducer";
import { RootState } from "../redux/store";
import Image from "next/image";

const PaymentCartItems = ({ product }: any) => {
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
          overflowY: "scroll",
          p: 2,
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
          <Box sx={{ width: 100, height: 100, position: "relative" }}>
            {/* eslint-disable */}
            <Image
              src={product?.image}
              layout="fill"
              objectFit="contain"
              quality={20}
              alt={product?.name}
            />
          </Box>
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
                fontSize: ".8rem",
                lineHeight: "1rem",
              }}
            >
              {product.name}
            </Typography>
          </Box>
          {product?.detail !== "" ? (
            <Box>
              <Typography sx={{ lineHeight: "1rem" }} variant="overline">
                {product.details}
              </Typography>
            </Box>
          ) : null}
          <Typography
            variant="overline"
            sx={{ lineHeight: "1rem", color: "#949495", fontSize: ".7rem" }}
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

export default PaymentCartItems;
