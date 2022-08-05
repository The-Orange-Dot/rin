import { Typography, Box, Modal } from "@mui/material";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";

export const FormatParagraphs = (text: string) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [openImage, setOpenImage] = useState(false);

  const paragraphs = text
    .split("\n")
    .map((paragraph: string, index: number) => {
      const image =
        paragraph.includes(".jpg") ||
        paragraph.includes(".jpeg") ||
        paragraph.includes(".png");

      if (index === 0) {
        return (
          <Typography variant="body1" key={index}>
            &emsp;&emsp;{" "}
            <strong style={{ fontSize: "1.5rem" }}>
              {paragraph.slice(0, 1).toUpperCase()}
            </strong>
            {paragraph.slice(1)}
          </Typography>
        );
      } else {
        if (image) {
          return (
            <Box
              key={index}
              sx={
                isMobile
                  ? {
                      width: "100%",
                      height: 250,
                      display: "flex",
                      justifyContent: "center",
                    }
                  : {
                      width: "100%",
                      height: 500,
                      display: "flex",
                      justifyContent: "center",
                    }
              }
            >
              <Box
                sx={
                  isMobile
                    ? { position: "relative", width: "90%", height: "100%" }
                    : { position: "relative", width: "50%", height: "100%" }
                }
              >
                <Image
                  src={paragraph}
                  alt="Something"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={paragraph}
                  quality={30}
                  onClick={() => {
                    setOpenImage(true);
                  }}
                />
              </Box>
              <Modal
                open={openImage}
                onClose={() => {
                  setOpenImage(false);
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setOpenImage(false);
                  }}
                >
                  <Box
                    sx={
                      isMobile
                        ? { width: "100%", height: 350, position: "relative" }
                        : { width: "100%", height: 900, position: "relative" }
                    }
                  >
                    <Image
                      src={paragraph}
                      alt="Something"
                      layout="fill"
                      objectFit="scale-down"
                      placeholder="blur"
                      blurDataURL={paragraph}
                      quality={isMobile ? 75 : 100}
                    />
                  </Box>
                </Box>
              </Modal>
            </Box>
          );
        } else {
          return (
            <Typography variant="body1" key={index}>
              &emsp;&emsp; {paragraph.slice(0, 1).toUpperCase()}
              {paragraph.slice(1)}
            </Typography>
          );
        }
      }
    });

  return paragraphs;
};
