import { Modal, Paper, Fade } from "@mui/material";
import React from "react";

const ProductModal = ({
  productModalOpen,
  setProductModalOpen,
  selectedProduct,
}: any) => {
  return (
    <Modal
      open={productModalOpen}
      onClose={() => setProductModalOpen(false)}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Fade in={productModalOpen}>
        <Paper sx={{ width: "80%" }}>ProductModal</Paper>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
