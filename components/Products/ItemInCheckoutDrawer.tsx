import React, { useState } from "react";
import { Paper, Box, Typography, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  editQuantity,
  removeItem,
} from "../../redux/reducers/shoppingCartReducer";
import { RootState } from "../../redux/store";
import Image from "next/image";

const ItemInCheckoutDrawer = ({ product }: any) => {
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
    <Box key={product.name}>
      <Box
        sx={{
          display: "flex",
          mb: 2,
        }}
      >
        <Box sx={{ position: "relative", width: 70, height: 70 }}>
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            alt={product.name}
            quality={15}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography>{product.name}</Typography>
          <Typography>Quantity: {product.quantity}</Typography>
          <Typography>
            Cost: ${product.price * product.quantity} (${product.price} per
            item)
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <RemoveIcon
              sx={{ cursor: "pointer" }}
              onClick={() => editItemQuantity("-")}
            />
            <Typography>{product.quantity}</Typography>
            <AddIcon
              sx={{ cursor: "pointer" }}
              onClick={() => editItemQuantity("+")}
            />
          </Box>
        </Box>
        <Box sx={{ width: "50%", textAlign: "center", cursor: "pointer" }}>
          <Typography onClick={() => removeItemFromCart()}>Remove</Typography>
        </Box>
      </Box>
      <Divider sx={{ m: 1 }} />
    </Box>
  );
};

export default ItemInCheckoutDrawer;
