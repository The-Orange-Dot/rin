import React, {
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { Pagination, Box } from "@mui/material";
import { ProductType } from "../../types/productTypes";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../../styles/Products.module.scss";

interface PaginationType {
  setProducts: Dispatch<SetStateAction<ProductType>>;
  setPageLoaded: Dispatch<SetStateAction<boolean>>;
}

const PaginationButtons = ({ setProducts, setPageLoaded }: PaginationType) => {
  const filters = useSelector((state: RootState) => state.productFilter.value);
  const [totalPages, setTotalPages] = useState(filters.totalProducts);

  useEffect(() => {
    const totalPages = Math.ceil(filters.totalProducts / 12);
    setTotalPages(totalPages);
  }, [filters.totalProducts]);

  const pageHandler = async (e: ChangeEvent<unknown>, value: number) => {
    gsap
      .timeline({
        onComplete: window.scrollTo({ top: 0, behavior: "smooth" }) as any,
      })
      .to(".card", { opacity: 0, y: -10, stagger: 0, duration: 0.1 });

    let query = `/api/products/?view=${value * 12}`;

    if (filters.category && filters.category !== "ALL") {
      query = query.concat(`&category=${filters.category.toLowerCase()}`);
    }
    if (filters.brand && filters.brand !== "ALL") {
      query = query.concat(
        `&brand=${filters.brand.replace(" ", "_").toLowerCase()}`
      );
    }

    const newPage = await fetch(query);
    const updatedPage = await newPage.json();
    setPageLoaded(false);

    setProducts(updatedPage.products);
  };

  return (
    <Box className={styles.pagnation_container}>
      <Pagination
        onChange={pageHandler}
        count={totalPages}
        defaultPage={1}
        boundaryCount={2}
        className="pagnation-buttons"
      />
    </Box>
  );
};

export default PaginationButtons;
