import {
  Paper,
  Box,
  Button,
  Typography,
  TextField,
  Rating,
} from "@mui/material";
import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { ProductHistoryType } from "../../../types/profileTypes";
import Image from "next/image";

const MobileReviewDrawer = ({
  openReviewDrawer,
  setOpenReviewDrawer,
  user,
  selectedProduct,
  queuedReviews,
  setQueuedReviews,
  productReviews,
  setProductReviews,
  productsFetch,
}: any) => {
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const submitReviewHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const review = {
      rating: ratingInput,
      review: reviewInput,
    };

    const res = await fetch(
      `/api/productReviews/${selectedProduct.productId}`,
      {
        method: "POST",
        body: JSON.stringify({
          product: selectedProduct,
          user: user,
          review: review,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    const filteredProduct = queuedReviews.filter(
      (product: ProductHistoryType) => {
        return product.id !== selectedProduct.id;
      }
    );
    await productsFetch();
    setQueuedReviews(filteredProduct);
    setProductReviews([data.updatedHistory, ...productReviews]);
    setOpenReviewDrawer(false);
  };

  return (
    <Paper sx={{ height: "90vh", width: "100%", overflowY: "scroll" }}>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Box sx={{ width: "100%", height: 200, position: "relative" }}>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            layout="fill"
            objectFit="contain"
            quality={25}
            priority
          />
        </Box>
        <Box>
          <Typography>{selectedProduct.brand}</Typography>
          <Typography>{selectedProduct.name}</Typography>
          <Typography>{selectedProduct.size}</Typography>
          <Typography>Purchased: {selectedProduct.quantity}</Typography>
          <Typography>Price per item: ${selectedProduct.price}</Typography>
        </Box>
      </Box>

      <form
        onSubmit={(e: SyntheticEvent) => submitReviewHandler(e)}
        style={{ width: "100%" }}
      >
        <Box sx={{ m: 1 }}>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Overall Rating: </Typography>
            <Rating
              size="large"
              sx={{ ml: 2, color: "#3f312b" }}
              value={ratingInput}
              onChange={(e: any) => setRatingInput(parseInt(e.target.value))}
            />
          </Box>
          <TextField
            sx={{ width: "100%" }}
            multiline
            minRows={6}
            label="Your review"
            fullWidth
            value={reviewInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setReviewInput(e.target.value)
            }
          />
        </Box>
      </form>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography>Survey </Typography>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography>
              1. I would suggest this product to a friend:{" "}
            </Typography>
            <Rating size="large" sx={{ color: "#3f312b" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography>
              2. I would likely purchase this product again:{" "}
            </Typography>
            <Rating size="large" sx={{ color: "#3f312b" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography>
              3. I would like to try other products this brand makes:{" "}
            </Typography>
            <Rating size="large" sx={{ color: "#3f312b" }} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-around", mb: 5, mt: 5 }}
      >
        <Button
          onClick={() => {
            setOpenReviewDrawer(false);
          }}
          variant="contained"
          color="secondary"
          sx={{ width: 150, height: 50 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ width: 150, height: 50 }}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default MobileReviewDrawer;
