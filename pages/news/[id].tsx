import React, { useState } from "react";
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

const Post = ({ postData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [post, setPost] = useState(postData);

  const postHeader = isMobile ? (
    <MobileArticleHeader post={post} />
  ) : (
    <ArticleHeader post={post} setPost={setPost} />
  );

  const postContent = isMobile ? (
    <MobileArticleContent post={post} />
  ) : (
    <ArticleContent post={post} setPost={setPost} />
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

import { prisma } from "../../prisma/db";
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: { category: { startsWith: "" } },
    take: 5,
    orderBy: { id: "desc" },
    select: {
      title: true,
      image: true,
      subtitle: true,
      createdAt: true,
      body: true,
      writer: true,
      category: true,
      id: true,
      keywords: true,
    },
  });

  const paths = await posts.map((post: any) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // const res = await fetch(`${server}/api/news/${context.params?.id}`);
    // const post = await res.json();

    const id = parseInt(context.params?.id as string);

    let post = await prisma.post.findFirst({
      where: { id: id },
    });

    if (post) {
      //@ts-ignore
      post.createdAt = post.createdAt.toString();
      //@ts-ignore
      post.updatedAt = post.updatedAt.toString();
    }

    return {
      props: { postData: post },
      revalidate: 60,
    };
  } catch {
    return { notFound: true };
  }
};

export default Post;
