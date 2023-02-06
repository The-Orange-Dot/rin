import React from "react";
import { server } from "../../config";
import styles from "../../styles/news/Main.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostType } from "../../types/newsTypes";
import { InferGetStaticPropsType } from "next";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ArticleHeader from "../../components/News/ArticleHeader";
import MobileArticleHeader from "../../components/News/Mobile/MobileArticleHeader";
import ArticleContent from "../../components/News/ArticleContent";
import MobileArticleContent from "../../components/News/Mobile/MobileArticleContent";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const postHeader = isMobile ? (
    <MobileArticleHeader post={post} />
  ) : (
    <ArticleHeader post={post} />
  );

  const postContent = isMobile ? (
    <MobileArticleContent post={post} />
  ) : (
    <ArticleContent post={post} />
  );

  return (
    <div className={styles.main}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={
            isMobile
              ? { mt: 15, width: "100%" }
              : {
                  mt: 20,
                  width: "100%",
                }
          }
        >
          {postHeader}

          {postContent}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "50vh",
          left: 0,
          top: "10%",
          backgroundColor: "#dfdfdf",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/news`);
  const posts = await res.json();

  const paths = await posts.map((post: PostType) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const res = await fetch(`${server}/api/news/${params.id}`);
    const post = await res.json();

    return {
      props: { post: post },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};

export default Post;
