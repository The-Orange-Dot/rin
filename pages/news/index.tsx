import { Box, Paper, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import News from "../../components/News";
import { server } from "../../config";
import styles from "../../styles/news/Main.module.scss";
import { PostType } from "../../types/newsTypes";
import MobileNews from "../../components/News/Mobile";
import { useMediaQuery } from "@mui/material";
import NewsFilter from "../../components/News/NewsFilter";

const NewsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [postsArray, setPostsArray] = useState(posts);
  const [filterSelected, setFilterSelected] = useState("");

  const postElements = postsArray.map((post: PostType, index: number) => {
    return isMobile ? (
      <MobileNews
        post={post}
        index={index}
        key={index}
        filterSelected={filterSelected}
      />
    ) : (
      <News
        post={post}
        index={index}
        key={index}
        filterSelected={filterSelected}
      />
    );
  });

  return (
    <div className={styles.main}>
      <Box className={styles.main_container}>
        <Typography
          variant="overline"
          fontSize="1rem"
          lineHeight="1rem"
          fontWeight="100"
        >
          News
        </Typography>
        <Box className={styles.filter_container}>
          <NewsFilter
            setPostsArray={setPostsArray}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
          />
        </Box>
        <Box className={styles.posts_container}>{postElements}</Box>
      </Box>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${server}/api/news`);
  const posts = await res.json();

  try {
    return {
      props: { posts: posts },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};

export default NewsPage;
