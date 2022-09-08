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
import styles from "../styles/ProductReviews.module.scss";
import Image from "next/image";

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
      <Box key={review.createdAt} className={styles.container}>
        <Box className={styles.user_review}>
          <Image
            alt="User img"
            src={review.userReview.image}
            width={50}
            height={50}
            className={styles.user_review__image}
            unoptimized
          />
          <Box className={styles.user_review__username}>
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
        <Box className={styles.review_details}>
          <Typography variant="caption" color="secondary">
            Posted: {DateFormatter(review.createdAt.toString())}
          </Typography>
          <Box
            className={styles.review_details__helpful}
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
