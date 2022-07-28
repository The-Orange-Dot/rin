import { Box, Divider, Typography } from "@mui/material";
import React, { SetStateAction, useState } from "react";
import { ProductHistoryType } from "../../types/profileTypes";
import Image from "next/image";
import { DateFormatter } from "../DateFormatter";
import { Rating } from "@mui/material";

const MyReviews = ({ user }: any) => {
  const products = user.buyHistory;
  const [selectedProduct, setSelectedProduct] = useState<
    SetStateAction<ProductHistoryType> | {}
  >({});

  const productReviews = products.filter((product: ProductHistoryType) => {
    return product.reviewWritten === true;
  });

  console.log(products);

  const productReviewCards = productReviews.map(
    (product: ProductHistoryType) => {
      const reviewDate = DateFormatter(product.review.createdAt);

      return (
        <Box
          key={product.id}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            p: 1,
            "&:hover": {
              border: "1px solid black",
              cursor: "pointer",
              opacity: 0.7,
            },
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                p: 1,
              }}
            >
              <Image
                src={product.image}
                layout="fill"
                objectFit="contain"
                alt={product.name}
                quality={20}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 2,
                flexDirection: "column",
                p: 1,
              }}
            >
              <Typography>{`${product.brand} - ${product.name}`}</Typography>
              <Rating
                size="small"
                readOnly={true}
                sx={{ mr: 0.5, color: "#3f312b" }}
                precision={0.25}
                value={product.review.rating}
              />
              <Typography>Review Created: {reviewDate}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #dfdfdf",
            }}
          >
            <Box
              sx={{
                height: 90,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>{product.review.description}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 30,
                backgroundColor: "#dfdfdf",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                pl: 1,
                pr: 1,
              }}
            >
              <Typography>
                {product.review.helpful} People found this useful
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }
  );

  const queuedReviews = products.filter((product: ProductHistoryType) => {
    return product.reviewWritten === false;
  });

  const queuedReviewsCards = queuedReviews.map(
    (product: ProductHistoryType, i: number) => {
      return (
        <>
          <Box
            key={product.id}
            sx={{
              width: "100%",
              height: 90,
              display: "flex",
              p: 1,
              "&:hover": {
                border: "1px solid black",
                cursor: "pointer",
                opacity: 0.7,
              },
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                p: 1,
              }}
            >
              <Image
                src={product.image}
                layout="fill"
                objectFit="contain"
                alt={product.name}
                quality={20}
              />
            </Box>
            <Box
              sx={{
                width: "70%",
                height: 70,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flex: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="overline" sx={{ lineHeight: "1.5rem" }}>
                {product.brand}
              </Typography>
              <Typography
                variant="overline"
                sx={{ lineHeight: "1rem", fontWeight: "bold" }}
              >
                {product.name}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ ml: "10%", mr: "10%" }} />
        </>
      );
    }
  );

  return (
    <Box sx={{ width: "100%", height: "75vh", display: "flex" }}>
      <Box
        sx={{
          width: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #dfdfdf",
          m: 0.5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 75,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#dfdfdf",
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Queued reviews
          </Typography>
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            Review products for discounts on your next purchase!
          </Typography>
        </Box>

        {queuedReviewsCards}
      </Box>
      <Box
        sx={{
          width: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          m: 0.5,
        }}
      >
        <Box sx={{ width: "100%", height: 75, backgroundColor: "#dfdfdf" }}>
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Your Written Reviews
          </Typography>
        </Box>
        {productReviewCards}
      </Box>
    </Box>
  );
};

export default MyReviews;
