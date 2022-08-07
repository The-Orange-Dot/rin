import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";
import styles from "../../styles/news/main.module.scss";

const NewsFilter = ({
  setPostsArray,
  filterSelected,
  setFilterSelected,
}: any) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const selectorArray = [
    { text: "Main", value: "" },
    {
      text: "Fashion",
      value: "fashion",
    },
    { text: "Culture", value: "culture" },
    { text: "Cosmetics", value: "cosmetics" },
    { text: "Blog", value: "blog" },
  ];

  const filterHandler = async (category: string) => {
    await fetch(`/api/news?filter=${category}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPostsArray(data);
          setFilterSelected(category);
          router.query.filter = category === "" ? "all" : category;

          router.push(
            {
              pathname: "/news",
              query: { ...router.query },
            },
            undefined,
            {}
          );
        });
      }
    });
  };

  const selector = selectorArray.map((selector: any, index: number) => {
    return (
      <Box
        key={index}
        sx={
          isMobile
            ? {
                width: 200,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }
            : {
                width: 150,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: ".2s",
                "&:hover": {
                  textDecoration: "underline",
                  transition: ".2s",
                  cursor: "pointer",
                  ".text": { fontWeight: 600, transition: "0.2s" },
                },
              }
        }
        onClick={() => {
          filterHandler(selector.value);
        }}
      >
        <Button
          disableRipple
          disableFocusRipple
          sx={{
            "&:hover": {
              backgroundColor: "#FFF",
            },
          }}
        >
          <Typography
            className="text"
            variant="overline"
            sx={
              filterSelected === selector.value
                ? {
                    textDecoration: "underline",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }
                : { fontSize: "1rem" }
            }
          >
            {selector.text}
          </Typography>
        </Button>
      </Box>
    );
  });

  return (
    <Box
      className={styles.selectorContainer}
      sx={
        isMobile
          ? {
              display: "flex",
              overflowX: "scroll",
            }
          : {
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }
      }
    >
      {selector}
    </Box>
  );
};

export default NewsFilter;
