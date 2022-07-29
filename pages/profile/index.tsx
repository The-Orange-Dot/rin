import { Button, Typography, Box } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../../styles/profile.module.css";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserProfile from "../../components/Profile/UserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ProfileSelectorType, UserDataType } from "../../types/profileTypes";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import EditIcon from "@mui/icons-material/Edit";
import { server } from "../../config";
import { ProductHistoryType } from "../../types/profileTypes";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";

const OrderHistory = dynamic(
  () => import("../../components/Profile/OrderHistory"),
  {
    ssr: false,
  }
);
const MyReviews = dynamic(() => import("../../components/Profile/MyReviews"), {
  ssr: false,
});

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [pageSelected, setPageSelected] = useState("My details");
  const [page, setPage] = useState(<UserProfile user={user.userData} />);
  const signOutHandler = () => {
    signOut({ callbackUrl: `${server}/products` });
  };
  const [productReviews, setProductReviews] = useState([]);
  const [queuedReviews, setQueuedReviews] = useState([]);

  useEffect(() => {
    productsFetch();
  }, []); //eslint-disable-line

  const productsFetch = async () => {
    const dbRes = await fetch(
      `${server}/api/users/${user.userData.id}?profile_fetch=true`
    );

    const userData = await dbRes.json();

    const products = userData.userData.buyHistory;

    const productReviews = products.filter((product: ProductHistoryType) => {
      return product.reviewWritten === true && product.firstBuy;
    });

    const queuedReviews = products.filter((product: ProductHistoryType) => {
      return product.reviewWritten === false && product.firstBuy;
    });

    setQueuedReviews(queuedReviews);
    setProductReviews(productReviews);
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
    if (pageSelected === "My details") {
      setPage(<UserProfile user={user.userData as UserDataType} />);
    } else if (pageSelected === "My reviews") {
      setPage(
        <MyReviews
          user={user.userData as UserDataType}
          productReviews={productReviews}
          queuedReviews={queuedReviews}
        />
      );
    } else if (pageSelected === "Order History") {
      setPage(<OrderHistory user={user.userData as UserDataType} />);
    }
  }, [pageSelected]); //eslint-disable-line

  return (
    <div className={styles.main}>
      {isMobile ? (
        <Box></Box>
      ) : (
        <>
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
              <Button
                sx={{ mt: 2, height: 60 }}
                onClick={() => signOutHandler()}
              >
                Sign Out
              </Button>
            </Box>
          </Box>

          <Box sx={{ minWidth: 1000, width: "70%", mt: 5 }}>{page}</Box>
        </>
      )}
    </div>
  );
};

import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const isServerReq = (req: any) => !req.url.startsWith("/_next");

  // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  //   apiVersion: "2020-08-27; orders_beta=v4",
  // });

  const session = await getSession(context);

  console.log(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userData = session.user as UserDataType;

  // const customer = await stripe.customers.retrieve(userData.id);

  const dbRes = await fetch(
    `${server}/api/users/${userData.id}?profile_fetch=true`
  );

  const user = await dbRes.json();

  return {
    props: { user },
  };
};

export default Profile;
