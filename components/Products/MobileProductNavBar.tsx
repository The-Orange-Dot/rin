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
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const MobileProductNavBar = ({
  filterDrawerOpened,
  setFilterDrawerOpened,
  brands,
}: any) => {
  const [expandCategory, setExpandCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [expandBrands, setExpandBrands] = useState(false);
  const [brandSelected, setBrandSelected] = useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const router = useRouter();

  const resetFiltersHandler = () => {
    setBrandSelected("");
    setCategorySelected("");
  };

  const categories = ["BATH", "SKINCARE", "HAIRCARE", "LOTION", "MAKE-UP"];
  const categorySelector = categories.map((category: string) => (
    <Box key={category} sx={{ cursor: "pointer" }}>
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

  const brandSelector = Object.entries(brands).map(([key, value]) => {
    return (
      <Box key={key} sx={{ cursor: "pointer" }}>
        <Typography
          sx={{ m: 1 }}
          onClick={() => {
            setExpandBrands(false);
            setBrandSelected(key);
          }}
        >
          {`${key} (${value})`}
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
