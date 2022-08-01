import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";
import { DateFormatter } from "../DateFormatter";
import { ProductHistoryType } from "../../types/profileTypes";

const ReviewDrawer = ({
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
    <Paper
      sx={{ height: "60vh", width: "100%", display: "flex", minWidth: 1200 }}
    >
      <Box
        sx={{ width: "30%", display: "flex", flexDirection: "column", p: 2 }}
      >
        <Box sx={{ width: "100%", height: 400, position: "relative" }}>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            layout="fill"
            objectFit="contain"
            quality={50}
            priority
          />
        </Box>
        <Typography>{selectedProduct.brand}</Typography>
        <Typography>{selectedProduct.name}</Typography>
        <Typography>{selectedProduct.size}</Typography>

        <Typography>Purchased: {selectedProduct.quantity}</Typography>
        <Typography>Price per item: ${selectedProduct.price}</Typography>
      </Box>

      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        onSubmit={(e: SyntheticEvent) => submitReviewHandler(e)}
      >
        <Box sx={{ width: "100%", height: "90%", display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "90%",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <Typography>
                Write your first impression and honest review of{" "}
                {selectedProduct.brand}&apos;s product that you purchased on{" "}
                {DateFormatter(selectedProduct.createdAt)}.
              </Typography>

              <Typography>
                If you aren&apos;t sure what to write, here are some questions
                to get you started:
              </Typography>

              <Typography>
                - What do you think of the packaging / product design?
              </Typography>
              <Typography>
                - What caught your attention about this product?
              </Typography>
              <Typography>
                - Did you feel the product was worth the cost? Why?
              </Typography>
              <Typography>
                - What made this product unique among other products?
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography>Overall Rating: </Typography>
                <Rating
                  sx={{ ml: 2, color: "#3f312b" }}
                  value={ratingInput}
                  onChange={(e: any) =>
                    setRatingInput(parseInt(e.target.value))
                  }
                />
              </Box>
              <TextField
                multiline
                minRows={8}
                maxRows={15}
                label="Your review"
                fullWidth
                value={reviewInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setReviewInput(e.target.value)
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
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
                <Rating sx={{ color: "#3f312b" }} />
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
                <Rating sx={{ color: "#3f312b" }} />
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
                <Rating sx={{ color: "#3f312b" }} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button type="submit">Submit Review</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ReviewDrawer;
