import { Box } from "@mui/system";
import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { DateFormatter } from "../DateFormatter";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { ProductHistoryType } from "../../types/profileTypes";

const OrderHistory = ({ user }: any) => {
  const products = user.buyHistory;

  const productHistory = products.map((product: ProductHistoryType) => {
    const date = DateFormatter(product.createdAt);
    return (
      <Box
        key={product.id}
        sx={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
          mb: 1,
          p: 2,
          "&:hover": { border: "1px solid black", opacity: 0.7 },
        }}
      >
        <Box sx={{ width: 100, height: 100, position: "relative", flex: 0.5 }}>
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1.5,
          }}
        >
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            {product.brand}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{product.name}</Typography>
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            {`$${product.price * product.quantity} ($${
              product.price
            } per Item)`}
          </Typography>
          <Typography
            color="secondary"
            variant="overline"
            sx={{ lineHeight: "1rem" }}
          >
            {product.size}, Qty: {product.quantity}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            Purchased:
          </Typography>
          <Typography variant="overline" sx={{ lineHeight: "1rem" }}>
            {date}
          </Typography>
          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center", lineHeight: "1rem" }}
          >
            Review Written:{" "}
            {product.reviewWritten ? <DoneIcon /> : <CloseIcon />}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        My Purchase History
      </Typography>
      {productHistory}
    </Box>
  );
};

export default OrderHistory;
