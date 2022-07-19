import {
  Drawer,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MobileProductNavBar = ({
  filterDrawerOpened,
  setFilterDrawerOpened,
  brands,
}: any) => {
  const [expandCategory, setExpandCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [expandBrands, setExpandBrands] = useState(false);
  const [brandSelected, setBrandSelected] = useState("");

  const resetFiltersHandler = () => {
    setBrandSelected("");
    setCategorySelected("");
  };

  const categories = ["BATH", "SKINCARE", "HAIRCARE", "LOTION"];
  const categorySelector = categories.map((category: string) => (
    <Box key={category}>
      <Typography
        sx={{ m: 1 }}
        onClick={() => {
          setExpandCategory(false);
          setCategorySelected(category);
        }}
      >
        {category}
      </Typography>
      <Divider />
    </Box>
  ));

  const brandSelector = brands.map((brand: string) => {
    return (
      <Box key={brand}>
        <Typography
          sx={{ m: 1 }}
          onClick={() => {
            setExpandBrands(false);
            setBrandSelected(brand);
          }}
        >
          {brand}
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
          width: "250px",
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
              sx={{
                textAlign: "center",
                maxHeight: "200px",
                overflowY: "scroll",
              }}
            >
              {brandSelector}
            </AccordionDetails>
          </Accordion>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              resetFiltersHandler();
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
