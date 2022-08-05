import React, { SyntheticEvent } from "react";
import Fuse from "fuse.js";
import { FormControl, Input, InputLabel, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const options = {
  isCaseSensitive: false,
  ignoreLocation: true,
  threshold: 0.1,
  keys: ["name"],
};

const FuseSearch = ({ imagesData, setFilesData }: any) => {
  const fuse = new Fuse(imagesData.images, options);

  const searchHandler = (e: any) => {
    const items = fuse.search(e.target.value);

    const itemList = items.map((item) => {
      return item.item;
    });

    if (e.target.value === "") {
      setFilesData(imagesData.images);
    } else {
      setFilesData(itemList);
    }
  };

  return (
    <Input
      size="small"
      id="img-search"
      sx={{ width: 300 }}
      onChange={(e) => {
        searchHandler(e);
      }}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      placeholder="Search Image Name"
    />
  );
};

export default FuseSearch;
