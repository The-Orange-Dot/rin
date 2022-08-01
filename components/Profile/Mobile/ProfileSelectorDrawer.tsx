import { SvgIconComponent } from "@mui/icons-material";
import { Paper, Box, styled, Typography } from "@mui/material";
import React from "react";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";

const StyledTypography = styled((props: TypographyProps) => (
  <MuiTypography {...props} variant="overline" />
))(() => ({
  lineHeight: "1rem",
}));

const ProfileSelectorDrawer = ({
  buttons,
  setPageSelected,
  setMobileSelectorOpen,
}: any) => {
  const selectors = buttons.map(
    (button: { text: string; icon: SvgIconComponent }) => {
      return (
        <Box
          key={button.text}
          sx={{
            display: "flex",
            width: "60%",
            justifyContent: "center",
            alignItems: "center",
            m: 1,
            ml: 2,
          }}
          onClick={() => {
            setPageSelected(button.text);
            setMobileSelectorOpen(false);
          }}
        >
          <button.icon sx={{ flex: 0.2 }} />
          <StyledTypography sx={{ flex: 0.55, fontSize: ".8rem" }}>
            {button.text}
          </StyledTypography>
        </Box>
      );
    }
  );

  return (
    <Paper
      sx={{
        height: "50%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
        pb: 3,
      }}
    >
      {selectors}
    </Paper>
  );
};

export default ProfileSelectorDrawer;
