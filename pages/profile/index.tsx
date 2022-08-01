import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Drawer,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
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
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ProfileSelectorDrawer from "../../components/Profile/Mobile/ProfileSelectorDrawer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  const [mobileSelectorOpen, setMobileSelectorOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [signoutLoader, setSignoutLoader] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const [user, setUser] = useState(session);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (session) {
      productsFetch().then(() => {
        setDataLoaded(true);
        setSignoutLoader(false);
      });
    }
  }, [status, session]); //eslint-disable-line

  useEffect(() => {
    if (user) {
      profileInit();
    }
  }, [dataLoaded]); //eslint-disable-line

  const productsFetch = async () => {
    if (session) {
      const dbRes = await fetch(`/api/users/${session?.id}?profile_fetch=true`);
      const user = await dbRes.json();
      setProducts(user.userData.buyHistory);
      setUser(user.userData);
    }
  };

  useEffect(() => {
    if (user) {
      if (pageSelected === "my details") {
        setPage(<UserProfile user={user} isMobile={isMobile} />);
      } else if (pageSelected === "my reviews") {
        setPage(
          <MyReviews
            user={user}
            products={products}
            productsFetch={productsFetch}
          />
        );
      } else if (pageSelected === "order history") {
        setPage(<OrderHistory user={user} isMobile={isMobile} />);
      } else if (pageSelected === "my coupons") {
        setPage(<MyCoupons user={user} />);
      }
    }
  }, [pageSelected]); //eslint-disable-line

  useEffect(() => {
    gsap.fromTo("#page-container", { opacity: 0 }, { opacity: 1 });
  }, [pageSelected, session]);

  const signOutHandler = async () => {
    setSignoutLoader(true);
    await signOut({ callbackUrl: `/products` });
  };

  const profileInit = () => {
    setPageSelected("my details");
    gsap.to("#selector-container", { opacity: 1 });
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

  return (
    <div className={styles.main}>
      {isMobile ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: "60%",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 5,
            }}
          >
            <ArrowDropDownIcon />
            <Typography
              variant="overline"
              sx={{ fontSize: "1rem" }}
              onClick={() => {
                setMobileSelectorOpen(true);
              }}
            >
              {pageSelected}
            </Typography>
          </Box>

          {page}

          <Drawer
            open={mobileSelectorOpen}
            onClose={() => {
              setMobileSelectorOpen(false);
            }}
            anchor="top"
          >
            <ProfileSelectorDrawer
              buttons={buttons}
              setPageSelected={setPageSelected}
              setMobileSelectorOpen={setMobileSelectorOpen}
            />
          </Drawer>
        </Box>
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
                opacity: 0,
              }}
              id="selector-container"
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
