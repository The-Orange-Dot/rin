import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../../redux/reducers/shoppingCartReducer";
import { gsap } from "gsap/dist/gsap";

const MobileCheckoutButton = ({
  closeModalHandler,
  quantity,
  setQuantity,
  options,
  product,
}: any) => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state: any) => state.shoppingCart.value);
  const [openAlert, setOpenAlert] = useState(false);

  const successTl = gsap
    .timeline({ paused: true })
    .fromTo("#success-alert", { y: 100 }, { y: 0, ease: "Expo.easeOut" })
    .to("#success-alert", { y: 100, delay: 3, ease: "Expo.easeIn" });

  const errorTl = gsap
    .timeline({ paused: true })
    .fromTo("#error-alert", { y: 100 }, { y: 0, ease: "Expo.easeOut" })
    .to("#error-alert", { y: 100, delay: 3, ease: "Expo.easeIn" });

  const addItemToCartHandler = async () => {
    try {
      const item = {
        id: product.id,
        image: product.image,
        name: product.name,
        quantity: quantity,
        price: product.price,
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
          name: product.name,
          image: product.image,
          quantity: foundItem.quantity + quantity,
          price: product.price,
        };

        dispatch(addItem([...updatedCart, updatedItem]));
      } else {
        console.log([...shoppingCart, item]);
        dispatch(addItem([...shoppingCart, item]));
      }
      successTl.play();
    } catch {
      errorTl.play();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        bottom: 0,
        backgroundColor: "white",
        height: "18vh",
        flexDirection: "column",
        pt: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          pl: 1,
          pr: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "65%",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="options-native">
              Options
            </InputLabel>
            <NativeSelect size="small" defaultValue={options}>
              <option value={"none"}>None</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 100,
            alignItems: "center",
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="quantity-native">
              Quantity
            </InputLabel>
            <NativeSelect
              size="small"
              defaultValue={1}
              onChange={(e: any) => {
                setQuantity(parseInt(e.target.value));
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", background: "white" }}>
        <Button
          onClick={() => {
            closeModalHandler("modal_open=true");
          }}
          variant="contained"
          sx={{ height: "50px", width: "50%", m: 1, flex: 1 }}
          color="secondary"
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{
            height: "50px",
            width: "50%",
            m: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1.5,
          }}
          onClick={() => {
            addItemToCartHandler();
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.5, flex: 1 }}>
            ${quantity * product.price}.00
          </Typography>
          <Typography
            variant="overline"
            sx={{ fontSize: ".5rem", flex: 1, lineHeight: 1.5 }}
          >
            Add to Card
          </Typography>
        </Button>
      </Box>
      <Alert
        id="success-alert"
        severity="success"
        sx={{
          position: "fixed",
          zIndex: -1,
          bottom: 55,
          pb: 10,
          textAlign: "center",
        }}
      >
        {product.name} has been added to your cart
      </Alert>

      <Alert
        id="error-alert"
        severity="error"
        sx={{ position: "fixed", zIndex: -1, bottom: 55, pb: 10 }}
      >
        Error
      </Alert>
    </Box>
  );
};

export default MobileCheckoutButton;
