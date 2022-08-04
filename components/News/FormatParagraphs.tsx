import { Typography, Box } from "@mui/material";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

export const FormatParagraphs = (text: string) => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const paragraphs = text
    .split("\n")
    .map((paragraph: string, index: number) => {
      const image = paragraph.includes("/image/");

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
              <Box sx={{ position: "relative", width: "90%", height: "100%" }}>
                <Image
                  src={paragraph.replace("/image/", "")}
                  alt="Something"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
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
