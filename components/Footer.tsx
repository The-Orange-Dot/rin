import {
  Paper,
  Typography,
  IconButton,
  InputBase,
  Divider,
  Grid,
  Box,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/footer.module.css";
import EmailIcon from "@mui/icons-material/Email";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import type { NextComponentType } from "next";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSession } from "next-auth/react";
import gsap from "gsap";

const Footer: NextComponentType = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [pageLoaded, setPageLoaded] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading") {
      setPageLoaded(true);
    }
  }, [session.status]);

  useEffect(() => {
    const tl = gsap
      .timeline({ paused: true })
      .fromTo(".footer", { opacity: 0 }, { opacity: 1 });

    if (pageLoaded) {
      tl.play(0);
    }
  }, [pageLoaded]);

  return (
    <div
      className={
        isMobile ? styles.mobile_footer_container : styles.footer_container
      }
    >
      <Box className={styles.footer_contact}>
        <Typography
          sx={{
            color: "#312f2f",
            fontWeight: 200,
            cursor: "pointer",
            letterSpacing: 4,
          }}
          variant="h4"
        >
          rin
        </Typography>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <InstagramIcon />
        </IconButton>
      </Box>

      <Grid
        sx={
          isMobile
            ? {
                m: "10px 0",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                minWidth: "20%",
              }
            : {
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                minWidth: "20%",
                flex: 1,
              }
        }
        container
        spacing={2}
      >
        <Grid item xl={4}>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            Explore
          </Typography>
          <Link href="/">
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/products">
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              Products
            </Typography>
          </Link>
        </Grid>
        <Grid item xl={4}>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            Company
          </Typography>
          <Link href={"/about"}>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
            >
              About
            </Typography>
          </Link>
        </Grid>
        <Grid item xl={4}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", mb: 1, min: "30%" }}
          >
            Services
          </Typography>
          {/* <Link href={"/contact"}> */}
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.5 } }}
          >
            Contact us
          </Typography>
          {/* </Link> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
