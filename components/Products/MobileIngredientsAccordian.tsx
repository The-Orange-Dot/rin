import React, { useState } from "react";
import { Typography, Grid, styled } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:before": {
    display: "none",
  },
  width: "100%",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMore
        sx={{
          fontSize: "1rem",
          transform: "rotate(-90deg)",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(255, 255, 255, 1)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  width: "100%",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const MobileIngredientsAccordion = ({ product }: any) => {
  const [openIngredients, setOpenIngredients] = useState<boolean>(false);

  const ingredients = product?.ingredients?.map((item: string) => {
    const itemSplit = item.split(" ");
    const itemName = itemSplit
      .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
      .join(" ");
    return (
      <Grid item key={item} xs={12}>
        <Typography variant="caption">{itemName}</Typography>
      </Grid>
    );
  });

  return (
    <Accordion
      expanded={openIngredients}
      onClick={() => setOpenIngredients(!openIngredients)}
    >
      <AccordionSummary>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          What&apos;s in it:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{ingredients}</AccordionDetails>
    </Accordion>
  );
};

export default MobileIngredientsAccordion;
