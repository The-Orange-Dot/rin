import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { DateFormatter } from "../DateFormatter";

import styles from "../../styles/news/articles.module.scss";

const MainPost = ({ post, animationComplete, index, setImageLoaded }: any) => {
  const date = DateFormatter(post.createdAt);

  return (
    <Box className={styles.main_post_container} key={index}>
      <Box className={styles.main_post_top_divider}>
        <Divider />
      </Box>
      <Link href={`/news/${post.id}`}>
        <Box
          sx={{
            "&:hover": animationComplete
              ? {
                  backgroundColor: "#dfdfdf",
                  transition: "0.3s",
                  cursor: "pointer",
                  ".image": { opacity: 0.9, transition: "0.3s" },
                }
              : {},
          }}
          className={
            animationComplete
              ? styles.main_post_card_anim_complete
              : styles.main_post_card
          }
        >
          <Box className={styles.main_post_card_content}>
            <Box className={styles.main_post_title_container}>
              <Typography
                variant="overline"
                fontWeight="400"
                fontSize="2rem"
                lineHeight="2rem"
                id="main-title"
              >
                {post.title}
              </Typography>
            </Box>
            <Box className={styles.main_post_subtitle_container}>
              <Typography
                variant="overline"
                fontWeight="100"
                fontSize="1rem"
                lineHeight="1rem"
                id="main-subtitle"
              >
                {post.subtitle}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="secondary" id="main-date">
                Posted: {date}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.main_post_image_container}>
            <Image
              className="image"
              src={post.image}
              objectPosition={"50% 50%"}
              layout="fill"
              objectFit="cover"
              alt={post.image}
              priority
              onLoadingComplete={() => {
                setImageLoaded(true);
              }}
              id="main-image"
            />
          </Box>
        </Box>
      </Link>
      <Box className={styles.main_post_bottom_divider}>
        <Divider />
      </Box>
    </Box>
  );
};
export default MainPost;
