import React, { useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import Image from "next/image";
import { PostType } from "../../../types/newsTypes";
import { DateFormatter } from "../../DateFormatter";

const index = ({ post, index }: any) => {
  const date = DateFormatter(post.createdAt);
  const even = index % 2 === 0;

  if (index === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        key={index}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", my: 5 }}>
            <Divider />
          </Box>
          <Box sx={{ width: "100%", height: "80%", position: "relative" }}>
            <Image
              src={post.image}
              layout="fill"
              objectFit="cover"
              alt={post.image}
              objectPosition="80% 0"
            />
          </Box>
          <Box
            sx={{
              width: "90%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: "400",
                fontSize: "1.5rem",
                lineHeight: "1.5rem",
              }}
            >
              {post.title}
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              width: "90%",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: "100",
                fontSize: ".8rem",
                lineHeight: ".8rem",
              }}
            >
              {post.subtitle}
            </Typography>{" "}
          </Box>
          <Box>
            <Typography variant="caption" color="secondary">
              Posted: {date}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", mt: 5 }}>
          <Divider />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          height: "15vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={
            even
              ? {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row-reverse",
                  mx: 5,
                  my: 2,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#dfdfdf",
                    transition: "0.3s",
                    cursor: "pointer",
                    ".image": { opacity: 0.8, transition: "0.3s" },
                  },
                }
              : {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  mx: 5,
                  my: 2,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#dfdfdf",
                    transition: "0.3s",
                    cursor: "pointer",
                    ".image": { opacity: 0.8, transition: "0.3s" },
                  },
                }
          }
        >
          <Box
            sx={{
              position: "relative",
              height: "100%",
              flex: 0.5,
            }}
          >
            <Image
              src={post.image}
              alt={post.image}
              layout="fill"
              objectFit="cover"
              className="image"
              quality={20}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ textAlign: "center", width: "80%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, lineHeight: "1rem" }}
              >
                {post.title}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 100, lineHeight: "1rem" }}
              >
                {post.subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Divider />
        </Box>
      </Box>
    );
  }
};

export default index;
