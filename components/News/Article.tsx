import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Link from "next/link";
//import styles from "../../styles/news/Articles.module.scss";
import styles from "./styles/Article.module.scss";
import Image from "next/image";
import { DateFormatter } from "../DateFormatter";

const Article = ({ post, index }: any) => {
  const even = index % 2 === 0;
  const date = DateFormatter(post.createdAt);

  return (
    <Box className={`${styles.post_container} trigger`} key={index}>
      <Link href={`/news/${post.id}`}>
        <Box className={even ? styles.post_even : styles.post_odd}>
          <Box className={styles.image_container}>
            <Image
              src={post.image.includes("http") ? post.image : `/${post.image}`}
              alt={post.image}
              layout="fill"
              objectFit="cover"
              className={styles.image}
            />
          </Box>
          <Box className={styles.post_content_container}>
            <Typography variant="h4" fontWeight={200}>
              {post.title}
            </Typography>

            <Typography variant="h6" fontWeight={200}>
              {post.subtitle}
            </Typography>
            <Box>
              <Typography variant="caption" color="secondary">
                Posted: {date}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Link>
      <Box className={styles.post_divider}>
        <Divider />
      </Box>
    </Box>
  );
};

export default Article;
