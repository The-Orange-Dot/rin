import { Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../../styles/profile.module.css";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import UserProfile from "../../components/Profile/UserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ProfileSelectorType, UserDataType } from "../../types/profileTypes";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import MyReviews from "../../components/Profile/MyReviews";
import { server } from "../../config";

const Profile = ({
  user,
  customerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [pageSelected, setPageSelected] = useState("My details");
  const [page, setPage] = useState(<UserProfile user={user.userData} />);

  const signOutHandler = () => {
    signOut({ redirect: false });
  };

  const buttons = [
    { icon: AccountCircleIcon, text: "My details" },
    { icon: EditIcon, text: "My reviews" },
    { icon: RedeemIcon, text: "My Coupons" },
    { icon: BookmarkBorderIcon, text: "My wishlist" },
    { icon: LocalShippingIcon, text: "Tracking" },
    { icon: ShoppingCartIcon, text: "Order History" },
  ];

  const selectors = buttons.map((button: ProfileSelectorType) => {
    return (
      <Box
        key={button.text}
        sx={
          pageSelected === button.text
            ? {
                width: "100%",
                height: 60,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#dfdfdf",
              }
            : {
                width: "100%",
                height: 60,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#dfdfdf" },
              }
        }
        onClick={() => setPageSelected(button.text)}
      >
        <Box sx={{ width: 60, textAlign: "center" }}>
          <button.icon />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="overline">{button.text}</Typography>
        </Box>
      </Box>
    );
  });

  useEffect(() => {
    console.log(pageSelected);
    if (pageSelected === "My details") {
      setPage(<UserProfile user={user.userData as UserDataType} />);
    } else if (pageSelected === "My reviews") {
      setPage(<MyReviews user={user.userData as UserDataType} />);
    }
  }, [pageSelected]); //eslint-disable-line

  return (
    <div className={styles.main}>
      <Box
        sx={{
          minWidth: 270,
          width: "20%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          ml: 10,
        }}
      >
        <Typography variant="overline" sx={{ fontSize: "1.5rem" }}>
          My Account
        </Typography>
        <Box
          sx={{
            height: "70%",
            width: 250,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            mr: 2,
          }}
        >
          {selectors}
          <Button sx={{ mt: 2, height: 60 }} onClick={() => signOutHandler()}>
            Sign Out
          </Button>
        </Box>
      </Box>

      <Box sx={{ minWidth: 1000, width: "70%", mt: 5 }}>{page}</Box>
    </div>
  );
};

import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27; orders_beta=v4",
  });

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userData = session.user as UserDataType;

  const customer = await stripe.customers.retrieve(userData.id);

  const dbRes = await fetch(`${server}/api/users/${userData.id}`);

  const user = await dbRes.json();

  return {
    props: { user, customer },
  };
};

export default Profile;
