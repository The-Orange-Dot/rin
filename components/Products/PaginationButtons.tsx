import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import PropTypes from "prop-types";
import { Pagination } from "@mui/material";
import { ProductType } from "../../types/productTypes";
import gsap from "gsap";

interface PaginationType {
  number: number;
  setProducts: Dispatch<SetStateAction<ProductType>>;
  setPageLoaded: Dispatch<SetStateAction<boolean>>;
}

const PaginationButtons = ({
  number,
  setProducts,
  setPageLoaded,
}: PaginationType) => {
  const totalPages = Math.ceil(number / 4);

  const pageHandler = async (e: ChangeEvent<unknown>, value: number) => {
    gsap.to(".card", { opacity: 0, y: -10, stagger: 0, duration: 0.1 });

    const newPage = await fetch(`/api/products/?view=${value * 4}`);
    const updatedPage = await newPage.json();
    setPageLoaded(false);

    setProducts(updatedPage.products);
  };

  return (
    <Pagination
      onChange={pageHandler}
      count={totalPages}
      defaultPage={1}
      boundaryCount={2}
      className="pagnation-buttons"
    />
  );
};

export default PaginationButtons;
