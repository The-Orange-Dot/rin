import {
  Box,
  SpeedDial,
  Typography,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridCellEditCommitParams,
} from "@mui/x-data-grid";
import styles from "./style/ProductForms.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

const ProductForms = ({ products }: any) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editSelection, setEditSelection] = useState([]);

  const openMenu = async (action: boolean, menu: any) => {
    await setAddProduct(false);
    await setEditProduct(false);

    menu(!action);
  };

  const actions = [
    {
      name: "Add new product",
      icon: <AddCircleIcon />,
      action: () => {
        openMenu(addProduct, setAddProduct);
      },
    },
    {
      name: "Edit product",
      icon: <EditIcon />,
      action: () => {
        openMenu(editProduct, setEditProduct);
      },
    },
  ];

  const commitHandler = async (param: GridCellEditCommitParams) => {
    const valueChecker =
      param.value === "ingredients" || param.value === "images"
        ? param.value.split(" , ")
        : param.value;

    const data = { [`${param.field}`]: valueChecker };

    const res = await fetch(`/api/products/${param.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });
    const updatedProduct = await res.json();

    console.log(updatedProduct);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
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
      width: 180,
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
    },
    {
      field: "ingredients",
      headerName: "Ingredients",
      width: 400,
      editable: true,
    },
  ];

  return (
    <Box className={styles.main}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        disableSelectionOnClick
        loading={isLoading}
        checkboxSelection={editProduct}
        //FIX EDIT PRODUCT INFO WITH SUBMIT BUTTON!!
        //onCellEditCommit={(params: GridCellEditCommitParams) =>
        //commitHandler(params)
        //}
      />

      <SpeedDial
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        ariaLabel={"Product Speed Dial"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ProductForms;
