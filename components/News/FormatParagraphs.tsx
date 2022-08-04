import { Typography, Box } from "@mui/material";

export const FormatParagraphs = (text: string) => {
  const paragraphs = text
    .split("\n")
    .map((paragraph: string, index: number) => {
      if (index === 0) {
        return (
          <Typography variant="body1">
            &emsp;&emsp;{" "}
            <strong style={{ fontSize: "1.5rem" }}>
              {paragraph.slice(0, 1).toUpperCase()}
            </strong>
            {paragraph.slice(1)}
          </Typography>
        );
      } else {
        return (
          <Typography variant="body1">
            &emsp;&emsp; {paragraph.slice(0, 1).toUpperCase()}
            {paragraph.slice(1)}
          </Typography>
        );
      }
    });

  return paragraphs;
};
