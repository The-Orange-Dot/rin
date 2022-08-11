import {
  Drawer,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import gsap from "gsap";
import {
  filterCategory,
  filterBrand,
  setPages,
} from "../../redux/reducers/productsFilterReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const MobileProductNavBar = ({
  filterDrawerOpened,
  setFilterDrawerOpened,
  brands,
  setPageLoaded,
  setProducts,
  setPaginationNum,
}: any) => {
  const [expandCategory, setExpandCategory] = useState(false);
  const [expandBrands, setExpandBrands] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [filterLoading, setFilterLoading] = useState(false);
  const brandSelected = useSelector(
    (state: RootState) => state.productFilter.value.brand
  );
  const categorySelected = useSelector(
    (state: RootState) => state.productFilter.value.category
  );
  const dispatch = useDispatch();

  const filterSearch = async () => {
    setFilterLoading(true);
    let query = "api/products?filter=true";

    if (categorySelected && categorySelected !== "ALL") {
      query = query.concat(`&category=${categorySelected.toLowerCase()}`);
    }

    if (brandSelected && brandSelected !== "ALL") {
      query = query.concat(
        `&brand=${brandSelected.replace(" ", "_").toLowerCase()}`
      );
    }
    const res = await fetch(query);
    const productsData = await res.json();
    setFilterDrawerOpened(false);
    setFilterLoading(false);

    gsap
      .timeline()
      .to(".card", {
        opacity: 0,
        duration: 0.2,
        onComplete: setProducts,
        onCompleteParams: [productsData.products],
      })
      .to(".card", { onComplete: setPageLoaded, onCompleteParams: [false] });

    setExpandCategory(false);
    setExpandBrands(false);
    dispatch(setPages(productsData.totalProducts));
  };

  const resetFilterHandler = async () => {
    if (categorySelected || brandSelected) {
      const res = await fetch("/api/products");
      const productsData = await res.json();
      setFilterDrawerOpened(false);

      gsap
        .timeline()
        .to(".card", {
          opacity: 0,
          duration: 0.2,
          onComplete: setProducts,
          onCompleteParams: [productsData.products],
        })
        .to(".card", { onComplete: setPageLoaded, onCompleteParams: [false] });
      dispatch(filterBrand(""));
      dispatch(filterCategory(""));
      setExpandCategory(false);
      setExpandBrands(false);
      setPaginationNum(productsData.totalProducts);
    }
  };

  const categories = [
    "ALL",
    "BATH",
    "SKINCARE",
    "HAIRCARE",
    "LOTION",
    "MAKE-UP",
  ];
  const categorySelector = categories?.map((category: string) => (
    <Box
      key={category}
      sx={{ cursor: "pointer" }}
      onClick={() => dispatch(filterCategory(category))}
    >
      <Typography
        sx={{ m: 1 }}
        onClick={() => {
          setExpandCategory(false);
        }}
      >
        {category}
      </Typography>
      <Divider />
    </Box>
  ));

  const brandSelector = brands?.map((brand: any) => {
    return (
      <Box
        key={brand?.brand}
        sx={{ cursor: "pointer" }}
        onClick={() => dispatch(filterBrand(brand.brand))}
      >
        <Typography
          sx={{ m: 1 }}
          onClick={() => {
            setExpandBrands(false);
          }}
        >
          {`${brand?.brand} (${brand?._count})`}
        </Typography>
        <Divider />
      </Box>
    );
  });

  return (
    <Drawer
      anchor="left"
      open={filterDrawerOpened}
      onClose={() => setFilterDrawerOpened(false)}
    >
      <Paper
        sx={{
          width: "30vw",
          minWidth: "250px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
        }}
      >
        <Typography>Filter</Typography>
        <Box sx={{ width: "90%", height: "100%" }}>
          <Accordion
            sx={{ width: "100%" }}
            expanded={expandCategory}
            onClick={() => setExpandCategory(!expandCategory)}
            disableGutters
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {categorySelected ? categorySelected : "Category"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ textAlign: "center" }}>
              {categorySelector}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: "100%" }}
            expanded={expandBrands}
            onClick={() => setExpandBrands(!expandBrands)}
            disableGutters
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {brandSelected ? brandSelected : "Brands"}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={
                isMobile
                  ? {
                      textAlign: "center",
                      maxHeight: "200px",
                      overflowY: "scroll",
                    }
                  : {
                      textAlign: "center",
                      maxHeight: "500px",
                      overflowY: "scroll",
                    }
              }
            >
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(filterBrand("ALL"))}
              >
                <Typography
                  sx={{ m: 1 }}
                  onClick={() => {
                    setExpandBrands(false);
                  }}
                >
                  ALL
                </Typography>
                <Divider />
              </Box>
              {brandSelector}
            </AccordionDetails>
          </Accordion>
          <Button
            disabled={filterLoading}
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              filterSearch();
            }}
          >
            {filterLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Set Filter"
            )}
          </Button>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              resetFilterHandler();
            }}
          >
            Reset Filters
          </Button>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default MobileProductNavBar;
