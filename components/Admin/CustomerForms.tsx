import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/admin/CustomerForms.module.scss";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const CustomerForms = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    await fetch("/api/users/adminFetch").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setRows(data.customers);
          setIsLoading(false);
          console.log(data.customers);
        });
      }
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.lastName}, ${params.row.firstName}`,
    },
    { field: "username", headerName: "Username", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.address1} ${
          params.row.address2 ? `, ${params.row.address2}` : ""
        }`,
    },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 90 },
    { field: "zipcode", headerName: "Zipcode", width: 150 },
    { field: "homePhone", headerName: "Home Phone", width: 150 },
    { field: "mobilePhone", headerName: "Mobile Phone", width: 150 },
  ];

  return (
    <Box className={styles.container}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        disableSelectionOnClick
        loading={isLoading}
        checkboxSelection
        // onCellEditCommit={(params: GridCellEditCommitParams) =>
        //   commitHandler(params)
        // }
      />
    </Box>
  );
};

export default CustomerForms;
