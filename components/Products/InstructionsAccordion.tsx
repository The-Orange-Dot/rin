import React, { useState } from "react";
import { Typography, Grid, styled, Box } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import styles from "./styles/InstructionsAccordion.module.scss";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  width: "100%",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMore sx={{ fontSize: "1.5rem", transform: "rotate(-90deg)" }} />
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

const InstructionsAccordion = ({ product }: any) => {
  const [openInstructions, setOpenInstructions] = useState<boolean>(false);

  const instructions = product?.instructions?.map((item: string, i: number) => {
    const index = i + 1;

    return (
      <Box key={item} className={styles.container}>
        <Typography variant="caption">
          {index}. {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Accordion
      className={styles.accordion}
      expanded={openInstructions}
      onClick={() => setOpenInstructions(!openInstructions)}
    >
      <AccordionSummary className={styles.accordion__summary}>
        <Typography
          className={styles.accordion__summary__title}
          fontWeight={600}
        >
          Suggested usage:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{instructions}</AccordionDetails>
    </Accordion>
  );
};

export default InstructionsAccordion;
