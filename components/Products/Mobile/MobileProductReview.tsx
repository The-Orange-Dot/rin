import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  Rating,
} from "@mui/material";
import { DateFormatter } from "../../DateFormatter";

const MobileProductReview = ({ review }: any) => {
  const [reviewTooLong, setReviewTooLong] = useState(false);
  const [description, setDescription] = useState(review?.description);
  useEffect(() => {
    if (review?.description?.length > 150) {
      setReviewTooLong(true);
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    if (reviewTooLong) {
      setDescription(`${review?.description?.slice(0, 150)}...`);
    } else {
      setDescription(review?.description);
    }
  }, [reviewTooLong]); //eslint-disable-line

  const expandReviewHandler = () => {
    if (review?.description?.length > 150) {
      setReviewTooLong(!reviewTooLong);
    }
  };

  return (
    <>
      <Box key={review.createdAt} sx={{ mt: 2, minWidth: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
          {/*eslint-disable*/}
          <img
            src={review.userReview.image}
            width={50}
            height={50}
            style={{ borderRadius: "20rem" }}
          />
          {/*eslint-enable*/}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="overline"
              sx={{ mb: 0, ml: 1, fontWeight: 600, lineHeight: 1.5 }}
            >
              {review?.userReview?.username}
            </Typography>
            <Rating
              size="small"
              sx={{ ml: 1, mr: 0.5, color: "#3f312b" }}
              value={review?.rating}
              precision={0.25}
              readOnly
            />
          </Box>
        </Box>
        <Box
          onClick={() => {
            expandReviewHandler();
          }}
        >
          <Typography>{description}</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" color="secondary">
            Posted: {DateFormatter(review.createdAt.toString())}
          </Typography>
          <Typography variant="caption" color="secondary">
            {review?.helpful} found this useful
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </>
  );
};

export default MobileProductReview;
