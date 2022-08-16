import { Typography, Box, Modal } from "@mui/material";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles/FormatParagraphs.module.scss";

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
            &emsp;&emsp; {paragraph.slice(0, 1).toUpperCase()}
            {paragraph.slice(1)}
          </Typography>
        );
      } else {
        if (image) {
          return (
            <Box key={index} className={styles.article_body}>
              <Box className={styles.image_container}>
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
                  className={styles.enlarged_image_modal}
                  onClick={() => {
                    setOpenImage(false);
                  }}
                >
                  <Box className={styles.enlarged_image}>
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
