import {
  Box,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addItem } from "../../redux/reducers/shoppingCartReducer";
import { useSelector, useDispatch } from "react-redux";

const CheckoutButton = ({ quantity, setQuantity, product }: any) => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);

  const addItemToCartHandler = async () => {
    const item = {
      id: product.id,
      image: product.image,
      name: product.name,
      quantity: quantity,
      price: product.price,
      stock: product.quantity,
    };

    let foundItem = await shoppingCart.find((item: any) => {
      return item.id === product.id;
    });
    if (foundItem) {
      const updatedCart = await shoppingCart.filter((item: any) => {
        return item.id !== product.id;
      });
      const updatedItem = {
        id: product.id,
        image: product.image,
        name: product.name,
        quantity: foundItem.quantity + quantity,
        price: product.price,
        stock: product.quantity,
      };

      dispatch(addItem([...updatedCart, updatedItem]));
    } else {
      dispatch(addItem([...shoppingCart, item]));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "25%", display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            sx={{
              minWidth: 70,
              width: "100%",
              display: "flex",
              justifyItems: "center",
              p: 0,
              height: 55,
              mr: 1,
            }}
            value={quantity}
            InputProps={{
              endAdornment: (
                <AddIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setQuantity(quantity + 1)}
                />
              ),
              startAdornment: (
                <RemoveIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                />
              ),
            }}
          />
        </Box>
        <Box sx={{ width: "75%" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: 55, display: "flex" }}
            disableElevation
            onClick={() => {
              addItemToCartHandler();
            }}
          >
            <Typography variant="button" sx={{ m: 0 }}>
              Add to cart
            </Typography>
            <Typography
              sx={{ ml: 1, mr: 1, fontWeight: 200 }}
              variant="overline"
            >
              ---
            </Typography>
            <Typography>${product.price * quantity}.00</Typography>
          </Button>
        </Box>
      </Box>
      {/* <Box sx={{ width: "70%" }}>
        <Select
          fullWidth
          variant="outlined"
          label="Options"
          size="small"
        ></Select>
      </Box> */}
    </Box>
  );
};

export default CheckoutButton;
