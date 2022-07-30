import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  return <div>Admin</div>;
};

import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const isServerReq = (req: any) => !req.url.startsWith("/_next");

  // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  //   apiVersion: "2020-08-27; orders_beta=v4",
  // });

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Admin;
