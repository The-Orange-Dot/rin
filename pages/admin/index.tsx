import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/admin.module.css";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

const ProductForms = dynamic(
  () => import("../../components/Admin/ProductForms")
);

const CreateNewsPost = dynamic(
  () => import("../../components/Admin/CreateNewsPost")
);

const ImagesDrawer = dynamic(
  () => import("../../components/Admin/ImagesDrawer")
);

const Admin = ({ imagesData }: any) => {
  const [selector, setSelector] = useState("news");
  const [page, setPage] = useState<any>(<Box />);
  const [openImageDrawer, setOpenImageDrawer] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const pagesArray = [
    { text: "News Form", value: "news" },
    { text: "Product Form", value: "store" },
  ];

  const pageSelector = pagesArray.map((page, index) => {
    return (
      <Box
        key={index}
        onClick={() => {
          setSelector(page.value);
        }}
        sx={{
          height: "100%",
          width: 200,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          "&:hover": { backgroundColor: "#dfdfdf", cursor: "pointer" },
        }}
      >
        <Typography>{page.text}</Typography>
      </Box>
    );
  });

  useEffect(() => {
    if (selector === "news") {
      setPage(<CreateNewsPost setOpenImageDrawer={setOpenImageDrawer} />);
    } else if (selector === "store") {
      setPage(<ProductForms />);
    }
  }, [selector]);

  return (
    <div className={styles.main}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1500px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: 40,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {pageSelector}
        </Box>
        {page}
        <Box sx={{ width: "50%" }}>
          <ImagesDrawer
            imagesData={imagesData}
            setOpenImageDrawer={setOpenImageDrawer}
            openImageDrawer={openImageDrawer}
          />
        </Box>
      </Box>
    </div>
  );
};

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { server } from "../../config";
import { Button, Drawer, Tooltip } from "@mui/material";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${server}/api/s3/s3Fetch`);
  const images = await res.json();

  return {
    props: { imagesData: images },
  };
};

export default Admin;
