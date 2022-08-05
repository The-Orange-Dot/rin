import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/admin.module.css";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const CreateNewsPost = dynamic(
  () => import("../../components/Admin/CreateNewsPost")
);

const ImagesDrawer = dynamic(
  () => import("../../components/Admin/ImagesDrawer")
);

const Admin = ({ imagesData }: any) => {
  const [selector, setSelector] = useState("posts");
  const [page, setPage] = useState<any>(<Box />);
  const [openImageDrawer, setOpenImageDrawer] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    if (selector === "posts") {
      setPage(<CreateNewsPost />);
    }
  }, [selector]);

  return (
    <div className={styles.main}>
      {page}
      <Button onClick={() => setOpenImageDrawer(true)}>ImageDrawer</Button>
      <Box sx={{ width: "50%" }}>
        <ImagesDrawer
          imagesData={imagesData}
          setOpenImageDrawer={setOpenImageDrawer}
          openImageDrawer={openImageDrawer}
        />
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
