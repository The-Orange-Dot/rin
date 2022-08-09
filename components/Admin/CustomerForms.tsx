import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/admin/CustomerForms.module.scss";
import {
  DataGrid,
  GridColDef,
  GridCellEditCommitParams,
} from "@mui/x-data-grid";

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
        });
      }
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 90 },
    { field: "zipcode", headerName: "Zipcode", width: 150 },
    { field: "homePhone", headerName: "Home Phone", width: 150 },
  ];

  return <Box className={styles.container}>CustomerForms</Box>;
};

export default CustomerForms;
