import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { UserDataType } from "../../types/profileTypes";

const UserProfile = ({ user }: any) => {
  const fullName = `${user?.firstName
    .slice(0, 1)
    .toLocaleUpperCase()}${user?.firstName.slice(1)} ${user?.lastName
    .slice(0, 1)
    .toLocaleUpperCase()}${user?.lastName.slice(1)} `;

  console.log(user);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ width: "100%", height: 180, backgroundColor: "#dfdfdf" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              position: "relative",
              mt: 30,
              ml: 5,
            }}
          >
            <Image
              alt={user?.name}
              src={user?.image}
              layout="fill"
              objectFit="fill"
              style={{ borderRadius: "50rem" }}
            />
          </Box>
          <Box sx={{ ml: 2, mt: 30 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {fullName}
            </Typography>
            <Typography
              color="secondary"
              variant="overline"
              sx={{ fontSize: ".7rem", lineHeight: ".2rem" }}
            >
              {user?.username}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            m: 5,
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ width: 580, mr: 2, mt: 15, p: 3 }}>
            <Typography>My Info</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <Typography>Shipping Details</Typography>
              <Typography variant="overline">
                First Name/Surname: {user?.name}
              </Typography>
              <Typography variant="overline">
                Last Name/Family Name: {user?.lastName}
              </Typography>
              <Typography variant="overline">
                Address: {user?.address1}
              </Typography>
              <Typography variant="overline">
                Apartment name/room #: {user?.address2 ? user?.address2 : "---"}
              </Typography>
              <Typography variant="overline">City: {user?.city}</Typography>
              <Typography variant="overline">State: {user?.state}</Typography>
              <Typography variant="overline">
                Postal Code: {user?.zipcode}
              </Typography>
              <Typography variant="overline">
                Home Phone: {user?.phone}
              </Typography>
              <Typography variant="overline">
                Mobile Phone: {user?.mobile}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <Typography>Billing Details</Typography>
              <Typography variant="overline">
                First Name/Surname: {user?.name}
              </Typography>
              <Typography variant="overline">
                Last Name/Family Name: {user?.lastName}
              </Typography>
              <Typography variant="overline">
                Address: {user?.address1}
              </Typography>
              <Typography variant="overline">
                Apartment name/room #: {user?.address2 ? user?.address2 : "---"}
              </Typography>
              <Typography variant="overline">City: {user?.city}</Typography>
              <Typography variant="overline">State: {user?.state}</Typography>
              <Typography variant="overline">
                Postal Code: {user?.zipcode}
              </Typography>
              <Typography variant="overline">
                Home Phone: {user?.phone}
              </Typography>
              <Typography variant="overline">
                Mobile Phone: {user?.mobile}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: 400, height: "50vh", mt: 17 }}>
            <Typography>my coupons</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
