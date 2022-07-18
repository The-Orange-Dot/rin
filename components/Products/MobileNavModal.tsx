import React from "react";
import { Paper, Modal, Fade } from "@mui/material";

const MobileNavModal = ({ mobileNavModalOpen, setMobileNavModalOpen }: any) => {
  return (
    <Modal
      sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      open={mobileNavModalOpen}
      onClose={() => {
        setMobileNavModalOpen(false);
      }}
    >
      <Fade in={mobileNavModalOpen}>
        <Paper sx={{ width: "50%", height: "25%", mt: 5 }}>
          MobileNavModal
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MobileNavModal;
