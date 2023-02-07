import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import styles from "./styles/NewsFilter.module.scss";
import { DateFormatter } from "../../components/DateFormatter";

const NewsFilter = ({
  setPostsArray,
  filterSelected,
  setFilterSelected,
}: any) => {
  const router = useRouter();
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
        className={styles.filter}
        onClick={() => filterHandler(selector.value)}
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
            className={styles.text}
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

  return <Box className={styles.selector_container}>{selector}</Box>;
};

export default NewsFilter;
