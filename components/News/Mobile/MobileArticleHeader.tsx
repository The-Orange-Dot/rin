import React from "react";
import Image from "next/image";
import { DateFormatter } from "../../DateFormatter";
import { Box, Divider, Typography } from "@mui/material";
import styles from "../styles/ArticleHeader.module.scss";

const MobileArticle = ({ post }: any) => {
  const date = DateFormatter(post.createdAt);

  return (
    <Box className={styles.header_container}>
      <Box className={styles.title_container}>
        <Typography
          variant="overline"
          fontWeight={600}
          fontSize="1.5rem"
          lineHeight="1.5rem"
        >
          {post.title}
        </Typography>
      </Box>
      <Box className={styles.subtitle_container}>
        <Typography
          variant="overline"
          fontWeight={200}
          fontSize=".8rem"
          lineHeight="1rem"
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
      <Box className={styles.divider}>
        <Divider />
      </Box>
    </Box>
  );
};

export default MobileArticle;
