import { Paper, Box, Typography, Divider } from "@mui/material";
import React from "react";
import { RootState } from "../../../redux/store";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import {
  editQuantity,
  removeItem,
} from "../../../redux/reducers/shoppingCartReducer";
import Image from "next/image";

const MobileCheckoutContent = ({ product }: any) => {
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.value
  );
  const dispatch = useDispatch();

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
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Image
            src={product.image}
            width={70}
            height={70}
            quality={20}
            alt={product.name}
          />
        </Box>
        <Box
          sx={{
            ml: 1,
            width: "75%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ lineHeight: 1.5, fontWeight: 600 }}
            variant="overline"
          >
            {product.name}
          </Typography>
          <Typography sx={{ lineHeight: 1.5 }} variant="overline">
            Quantity: {product.quantity}
          </Typography>
          <Typography sx={{ lineHeight: 1.5 }} variant="overline">
            Cost: ${product.price * product.quantity} (${product.price} per
            item)
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 1, mb: 1 }}>
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
    </Box>
  );
};

export default MobileCheckoutContent;
