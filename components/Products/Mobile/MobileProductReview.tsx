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
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
  addLike,
  removeLike,
} from "../../../redux/reducers/reviewHelpfulReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const MobileProductReview = ({ review }: any) => {
  const [reviewTooLong, setReviewTooLong] = useState(false);
  const [description, setDescription] = useState(review?.description);
  const [helpful, setHelpful] = useState(review.helpful);
  const [liked, setLiked] = useState(false);
  const likesArray = useSelector(
    (state: RootState) => state.reviewHelpful.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const liked = likesArray.includes(review?.id);
    setLiked(liked);
  }, [likesArray]); //eslint-disable-line

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

  const likesHandler = () => {
    updateReviewLikes(true);
    setHelpful(helpful + 1);

    dispatch(addLike(review.id));
  };

  const removeLikeHandler = () => {
    updateReviewLikes(false);
    dispatch(removeLike(review.id));
    setHelpful(helpful - 1);
  };

  const updateReviewLikes = async (helpful: boolean) => {
    await fetch(`/api/review_helpful/${review?.id}`, {
      method: "PATCH",
      body: JSON.stringify({ helpful }),
      headers: { "Content-Type": "application/json" },
    });
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
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              liked ? removeLikeHandler() : likesHandler();
            }}
          >
            {liked ? (
              <EmojiEmotionsIcon fontSize="small" />
            ) : (
              <SentimentVerySatisfiedIcon fontSize="small" />
            )}
            <Typography variant="caption" color="secondary">
              {helpful} found this useful
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </>
  );
};

export default MobileProductReview;
