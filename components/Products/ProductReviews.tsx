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
  Tooltip,
} from "@mui/material";
import { DateFormatter } from "../DateFormatter";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { ProductReviewType } from "../../types/productTypes";
import { addLike, removeLike } from "../../redux/reducers/reviewHelpfulReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./styles/ProductReviews.module.scss";
import Image from "next/image";

interface ProductReviewsType {
  review: ProductReviewType;
}

const ProductReviews = ({ review }: ProductReviewsType) => {
  const dispatch = useDispatch();
  const [reviewTooLong, setReviewTooLong] = useState(false);
  const [description, setDescription] = useState(review?.description);
  const likesArray = useSelector(
    (state: RootState) => state.reviewHelpful.value
  );
  const [liked, setLiked] = useState(false);
  const [helpful, setHelpful] = useState(review.helpful);

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

  useEffect(() => {
    const liked = likesArray.includes(review?.id);
    setLiked(liked);
  }, [likesArray]); //eslint-disable-line

  const expandReviewHandler = () => {
    if (review?.description?.length > 250) {
      setReviewTooLong(!reviewTooLong);
    }
  };

  const username =
    review?.userReview?.username?.length > 10
      ? `${review?.userReview?.username?.slice(0, 10)}...`
      : review?.userReview?.username;

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
          <Box className={styles.user_review__image_container}>
            <Image
              alt="User img"
              src={review.userReview.image}
              width={50}
              height={50}
              className={styles.user_review__image}
              unoptimized
            />
            <Tooltip
              title={review?.userReview?.username}
              className={styles.user_review__tooltip}
              enterDelay={500}
            >
              <Typography
                variant="overline"
                className={styles.user_review__username}
                fontWeight={600}
                lineHeight={1.5}
              >
                {username}
              </Typography>
            </Tooltip>
            <Rating
              size="small"
              readOnly={true}
              sx={{ mr: 0.5, color: "#3f312b" }}
              precision={0.25}
              value={review?.rating}
            />
          </Box>
          <Box
            className={
              reviewTooLong
                ? styles.user_review__text_long
                : styles.user_review__text
            }
            onClick={() => {
              expandReviewHandler();
            }}
          >
            <Typography>{description}</Typography>
          </Box>
        </Box>
        <Box className={styles.review_details}>
          <Typography variant="caption" color="secondary">
            Posted: {DateFormatter(review.createdAt)}
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
              {helpful} found this helpful
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>
    </>
  );
};

export default ProductReviews;
