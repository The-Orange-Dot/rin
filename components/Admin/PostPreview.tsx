import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormatParagraphs } from "../News/FormatParagraphs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const PostPreview = ({ title, subTitle, image, body }: any) => {
  const [imagePreview, setImagePreview] = useState<any>();

  useEffect(() => {
    if (image) {
      if (image.includes(".jpg") || image.includes(".jpeg")) {
        setImagePreview(
          <Box sx={{ width: "100%", height: "20vh", position: "relative" }}>
            <Image src={image} alt={image} layout="fill" objectFit="contain" />
          </Box>
        );
      }
    } else {
      setImagePreview(<Box />);
    }
  }, [image]);

  const preview = body.split("\n").map((text: string, index: number) => {
    if (
      (text.includes("/image/") && text.includes(".jpg")) ||
      (text.includes("/image/") && text.includes(".jpeg"))
    ) {
      return (
        <Box sx={{ width: "100%", height: 200, position: "relative", m: 1 }}>
          <Image
            src={text.replace("/image/", "")}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      );
    }
    return (
      <Typography sx={{ fontSize: ".4rem" }} key={index}>
        &emsp;&emsp;{text}
      </Typography>
    );
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box>
        <Typography>PC SCREEN PREVIEW</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          border: "4px solid black",
          borderRadius: "1rem",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: 40,
            height: 130,
            backgroundColor: "#dfdfdf",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: 5,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Typography>rin</Typography>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="overline" sx={{ fontSize: ".4rem" }}>
              Admin
            </Typography>
            <Typography variant="overline" sx={{ fontSize: ".4rem" }}>
              Home
            </Typography>
            <Typography variant="overline" sx={{ fontSize: ".4rem" }}>
              News
            </Typography>
            <Typography variant="overline" sx={{ fontSize: ".4rem" }}>
              Store
            </Typography>
            <ShoppingCartIcon sx={{ fontSize: ".8rem" }} />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 10,
            minHeight: "40vh",
          }}
        >
          <Box sx={{ width: "90%", px: 3, textAlign: "center", minHeight: 20 }}>
            <Typography
              variant="overline"
              sx={{ lineHeight: ".5", fontWeight: 600, fontSize: "1rem" }}
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ width: "90%", px: 3, textAlign: "center", minHeight: 20 }}>
            <Typography
              variant="overline"
              sx={{
                lineHeight: "1rem",
                fontWeight: 100,
                fontSize: ".5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {subTitle}
            </Typography>
          </Box>
          <Box sx={{ width: "100%", minHeight: 195 }}>{imagePreview}</Box>
          <Box
            sx={{
              width: "90%",
              px: 3,
              mt: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {preview}
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "1px", mb: 10 }}>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default PostPreview;
