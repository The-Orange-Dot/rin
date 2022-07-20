import React, { useEffect, useState } from "react";
import {
  Modal,
  Paper,
  Fade,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  styled,
  Rating,
} from "@mui/material";
import { DateFormatter } from "../DateFormatter";

const ProductReviews = ({ review }: any) => {
  const [reviewTooLong, setReviewTooLong] = useState(false);
  const [description, setDescription] = useState(review?.description);

  useEffect(() => {
    if (review?.description?.length > 250) {
      setReviewTooLong(true);
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    if (reviewTooLong) {
      setDescription(`${review?.description?.slice(0, 250)}...`);
    } else {
      setDescription(review?.description);
    }
  }, [reviewTooLong]); //eslint-disable-line

  const expandReviewHandler = () => {
    if (review?.description?.length > 250) {
      setReviewTooLong(!reviewTooLong);
    }
  };

  const username =
    review?.userReview?.username?.length > 10
      ? `${review?.userReview?.username?.slice(0, 10)}...`
      : review?.userReview?.username;

  return (
    <>
      <Box key={review.createdAt} sx={{ mt: 2, minWidth: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              mb: 1,
              width: "18%",
            }}
          >
            {/*eslint-disable*/}
            <img
              src={review.userReview.image}
              width={50}
              height={50}
              style={{ borderRadius: "20rem" }}
            />
            {/*eslint-enable*/}
            <Typography
              variant="overline"
              sx={{ mb: 0, ml: 1, fontWeight: 600, lineHeight: 1.5 }}
            >
              {username}
            </Typography>
            <Rating
              size="small"
              readOnly={true}
              sx={{ mr: 0.5, color: "#3f312b" }}
              precision={0.25}
              value={review?.rating}
            />
          </Box>
          <Box
            sx={
              reviewTooLong
                ? { width: "82%", textAlign: "start", cursor: "pointer" }
                : { width: "82%", textAlign: "start" }
            }
            onClick={() => {
              expandReviewHandler();
            }}
          >
            <Typography>{description}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" color="secondary">
            Posted: {DateFormatter(review.createdAt.toString())}
          </Typography>
          <Typography variant="caption" color="secondary">
            {review.helpful} found this helpful
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </>
  );
};

export default ProductReviews;
