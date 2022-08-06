import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

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
          router.push(router);
        });
      }
    });
  };

  const selector = selectorArray.map((selector: any, index: number) => {
    return (
      <Box
        key={index}
        sx={{
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
        }}
        onClick={() => {
          filterHandler(selector.value);
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
      </Box>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {selector}
    </Box>
  );
};

export default NewsFilter;
