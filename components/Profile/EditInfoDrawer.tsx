import { Paper, Box, Typography, Input } from "@mui/material";
import React from "react";

const EditInfoDrawer = () => {
  return (
    <Paper sx={{ width: "100%", height: "50vh" }}>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography>First Name: </Typography>
          <Input size="small" />
        </Box>
      </Box>
    </Paper>
  );
};

export default EditInfoDrawer;
