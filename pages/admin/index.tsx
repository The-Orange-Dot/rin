import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.scss";
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

const Admin = ({ imagesData, products, customers }: any) => {
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
    { text: "Customer Forms", value: "customer" },
  ];

  const pageSelector = pagesArray.map((page, index) => {
    return (
      <Box
        key={index}
        onClick={() => {
          setSelector(page.value);
        }}
        sx={
          selector === page.value
            ? {
                height: "100%",
                width: 200,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#dfdfdf",
              }
            : {
                height: "100%",
                width: 200,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                "&:hover": { backgroundColor: "#dfdfdf", cursor: "pointer" },
              }
        }
      >
        <Typography fontWeight={selector === page.value ? 600 : 200}>
          {page.text}
        </Typography>
      </Box>
    );
  });

  useEffect(() => {
    if (selector === "news") {
      setPage(<CreateNewsPost setOpenImageDrawer={setOpenImageDrawer} />);
    } else if (selector === "store") {
      setPage(<ProductForms products={products} />);
    } else if (selector === "customer") {
      setPage(<CustomerForms customers={customers} />);
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
import CustomerForms from "../../components/Admin/CustomerForms";
import { prisma } from "../../prisma/db";
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

  let products = await prisma.product.findMany();
  products.forEach((product) => {
    //@ts-ignore
    product.createdAt = product.createdAt.toString();
    //@ts-ignore
    product.updatedAt = product.updatedAt.toString();
  });

  let customers = await prisma.user.findMany({
    where: { NOT: { status: "admin" } },
    orderBy: { lastName: "asc" },
    select: {
      address1: true,
      address2: true,
      city: true,
      country: true,
      createdAt: true,
      email: true,
      firstName: true,
      homePhone: true,
      id: true,
      lastName: true,
      mobilePhone: true,
      state: true,
      status: true,
      username: true,
      zipcode: true,
      updatedAt: true,
    },
  });

  customers.forEach((customer) => {
    //@ts-ignore
    customer.createdAt = customer.createdAt.toString();
    //@ts-ignore
    customer.updatedAt = customer.updatedAt.toString();
  });

  const res = await fetch(`${server}/api/s3/s3Fetch`);
  const images = await res.json();

  return {
    props: { imagesData: images, products: products, customers: customers },
  };
};

export default Admin;
