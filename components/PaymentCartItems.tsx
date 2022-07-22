import React, { useState } from "react";
import { Paper, Box, Typography, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  editQuantity,
  removeItem,
} from "../redux/reducers/shoppingCartReducer";
import { RootState } from "../redux/store";

const PaymentCartItems = ({ product }: any) => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );

  const editItemQuantity = (action: string) => {
    let changeQuantity = product.quantity;
    if (action === "+") {
      if (product.quantity < product.stock) {
        changeQuantity = product.quantity + 1;
      } else {
        changeQuantity = product.stock;
      }
    } else {
      if (product.quantity > 1) {
        changeQuantity = product.quantity - 1;
      } else {
        changeQuantity = 1;
      }
    }
    const updatedCart = {
      name: product.name,
      quantity: changeQuantity,
    };
    dispatch(editQuantity(updatedCart));
  };

  const removeItemFromCart = () => {
    const updatedCart = shoppingCart.filter((item: any) => {
      return product.name !== item.name;
    });

    dispatch(removeItem(updatedCart));
  };

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
          {/* eslint-disable */}
          <img
            src={product.image}
            width={100}
            height={100}
            alt={product.name}
          />
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
