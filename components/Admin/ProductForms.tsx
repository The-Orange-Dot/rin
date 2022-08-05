import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridCellEditCommitParams,
  MuiEvent,
  MuiBaseEvent,
  GridCallbackDetails,
  GridCellParams,
} from "@mui/x-data-grid";

const ProductForms = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products/adminFetch");
    const { products } = await res.json();
    setRows(products);

    // console.log(products);
    setIsLoading(false);
  };

  const commitHandler = async (param: GridCellEditCommitParams) => {
    const data = { [`${param.field}`]: param.value };

    const res = await fetch(`/api/products/${param.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });
    const updatedProduct = await res.json();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price (1x)",
      type: "number",
      width: 90,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      width: 90,
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",
      width: 120,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      editable: true,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      editable: true,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 50,
      type: "number",
      editable: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 90,
      editable: true,
    },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 250,
      editable: true,
    },
    {
      field: "images",
      headerName: "Images",
      width: 90,
      editable: true,
      valueGetter: (params) => {
        return params?.row?.images?.length;
      },
    },
    {
      field: "ingredients",
      headerName: "Ingredients",
      width: 90,
      editable: true,
      valueGetter: (params) => {
        return params?.row?.ingredients?.length;
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        height: 700,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        disableSelectionOnClick
        loading={isLoading}
        checkboxSelection
        onCellEditCommit={(params: GridCellEditCommitParams) =>
          commitHandler(params)
        }
      />
    </Box>
  );
};

export default ProductForms;
