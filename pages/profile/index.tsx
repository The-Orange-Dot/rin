import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/profile.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserProfile from "../../components/Profile/UserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ProfileSelectorType } from "../../types/profileTypes";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RedeemIcon from "@mui/icons-material/Redeem";
import EditIcon from "@mui/icons-material/Edit";
import { ProductHistoryType } from "../../types/profileTypes";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import gsap from "gsap";

const OrderHistory = dynamic(
  () => import("../../components/Profile/OrderHistory"),
  {
    ssr: false,
  }
);
const MyReviews = dynamic(() => import("../../components/Profile/MyReviews"), {
  ssr: false,
});

const MyCoupons = dynamic(() => import("../../components/Profile/MyCoupons"), {
  ssr: false,
});

const Profile = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [pageSelected, setPageSelected] = useState("");
  const [page, setPage] = useState(<Box />);
  const [productReviews, setProductReviews] = useState<
    SetStateAction<ProductHistoryType[]>
  >([]);
  const [queuedReviews, setQueuedReviews] = useState<
    SetStateAction<ProductHistoryType[]>
  >([]);

  const [signoutLoader, setSignoutLoader] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    productsFetch();
    setSignoutLoader(false);
  }, [session]); //eslint-disable-line

  const signOutHandler = async () => {
    setSignoutLoader(true);
    await signOut({ callbackUrl: `/products` });
  };

  const productsFetch = async () => {
    if (session) {
      const products = session.buyHistory as ProductHistoryType[];

      const productReviews = products.filter((product) => {
        return product.reviewWritten === true && product.firstBuy;
      });

      const queuedReviews = products.filter((product) => {
        return product.reviewWritten === false && product.firstBuy;
      });

      setQueuedReviews(queuedReviews);
      setProductReviews(productReviews);
      setPageSelected("my details");
    }
  };

  const buttons = [
    { icon: AccountCircleIcon, text: "my details" },
    { icon: EditIcon, text: "my reviews" },
    { icon: RedeemIcon, text: "my coupons" },
    { icon: BookmarkBorderIcon, text: "my wishlist" },
    { icon: LocalShippingIcon, text: "tracking" },
    { icon: ShoppingCartIcon, text: "order history" },
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
    if (pageSelected === "my details") {
      setPage(<UserProfile user={session} />);
    } else if (pageSelected === "my reviews") {
      setPage(
        <MyReviews
          user={session}
          productReviews={productReviews}
          queuedReviews={queuedReviews}
        />
      );
    } else if (pageSelected === "order history") {
      setPage(<OrderHistory user={session} />);
    } else if (pageSelected === "my coupons") {
      setPage(<MyCoupons user={session} />);
    }
  }, [pageSelected, session]); //eslint-disable-line

  useEffect(() => {
    gsap.fromTo("#page-container", { opacity: 0 }, { opacity: 1 });
  }, [pageSelected, session]);

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
                disabled={signoutLoader}
                sx={{ mt: 2, height: 60 }}
                onClick={() => signOutHandler()}
              >
                {signoutLoader ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Sign Out"
                )}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{ minWidth: 1000, width: "70%", mt: 5, opacity: 0 }}
            id="page-container"
          >
            {page}
          </Box>
        </>
      )}
    </div>
  );
};

// import { authOptions } from "../api/auth/[...nextauth]";
// import { unstable_getServerSession } from "next-auth/next";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const isServerReq = (req: any) => !req.url.startsWith("/_next");

//   // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
//   //   apiVersion: "2020-08-27; orders_beta=v4",
//   // });

//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   // const userData = session.user as UserDataType;

//   // const customer = await stripe.customers.retrieve(userData.id);

//   return {
//     props: {},
//   };
// };

export default Profile;
