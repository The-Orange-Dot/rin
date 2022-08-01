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
  padding: 0,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const MobileInstructionsAccordion = ({ product }: any) => {
  const [openInstructions, setOpenInstructions] = useState<boolean>(false);

  const instructions = product?.instructions?.map((item: string, i: number) => {
    const index = i + 1;

    return (
      <Grid item key={item}>
        <Typography variant="caption">
          {index}. {item}
        </Typography>
      </Grid>
    );
  });

  return (
    <Accordion
      expanded={openInstructions}
      onClick={() => setOpenInstructions(!openInstructions)}
    >
      <AccordionSummary>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Suggested usage:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{instructions}</AccordionDetails>
    </Accordion>
  );
};

export default MobileInstructionsAccordion;
