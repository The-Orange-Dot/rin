import React from "react";
import { Modal, Fade, Paper, Button, Backdrop } from "@mui/material";

const MobileProductsModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: any) => {
  return (
    <Modal
      open={productModalOpen}
      onClose={() => setProductModalOpen(false)}
      sx={{ display: "flex", justifyContent: "center" }}
      hideBackdrop
    >
      <Fade in={productModalOpen} timeout={500}>
        <Paper square sx={{ width: "100%" }}>
          Mobile Product Modal
          <Button onClick={() => setProductModalOpen(false)}>Back</Button>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MobileProductsModal;
