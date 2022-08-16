import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { DateFormatter } from "../DateFormatter";
import styles from "./styles/ArticleHeader.module.scss";

const Article = ({ post }: any) => {
  const date = DateFormatter(post.createdAt);

  return (
    <Box className={styles.header_container}>
      <Box className={styles.title_container}>
        <Typography
          variant="overline"
          fontSize="3rem"
          fontWeight={600}
          lineHeight="3rem"
        >
          {post.title}
        </Typography>
      </Box>
      <Box className={styles.subtitle_container}>
        <Typography
          variant="overline"
          fontSize="1.5rem"
          fontWeight={100}
          lineHeight="3rem"
        >
          {post.subtitle}
        </Typography>
      </Box>
      <Box className={styles.date_container}>
        <Typography variant="caption" color="secondary">
          Posted: {date}
        </Typography>
      </Box>
      <Box className={styles.header_image}>
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          priority
          placeholder="blur"
          blurDataURL={post.image}
        />
      </Box>
    </Box>
  );
};

export default Article;
