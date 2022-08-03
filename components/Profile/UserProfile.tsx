import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { UserDataType } from "../../types/profileTypes";

const UserProfile = ({ user, isMobile }: any) => {
  const fullName = `${user?.firstName
    ?.slice(0, 1)
    .toLocaleUpperCase()}${user?.firstName?.slice(1)} ${user?.lastName
    ?.slice(0, 1)
    .toLocaleUpperCase()}${user?.lastName?.slice(1)} `;

  return isMobile ? (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "visible",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            position: "relative",
          }}
        >
          <Image
            alt={user?.name}
            src={user?.image}
            layout="fill"
            objectFit="fill"
            style={{ borderRadius: "50rem" }}
            quality={25}
            priority
          />
        </Box>
        <Box sx={{ ml: 2 }}>
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
          height: "100%",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography>Shipping Details</Typography>
        <Typography variant="overline">
          First Name/Surname: {user?.firstName}
        </Typography>
        <Typography variant="overline">
          Last Name/Family Name: {user?.lastName}
        </Typography>
        <Typography variant="overline">Address: {user?.address1}</Typography>
        <Typography variant="overline">
          Apartment name/room #: {user?.address2 ? user?.address2 : "---"}
        </Typography>
        <Typography variant="overline">City: {user?.city}</Typography>
        <Typography variant="overline">State: {user?.state}</Typography>
        <Typography variant="overline">Postal Code: {user?.zipcode}</Typography>
        <Typography variant="overline">Home Phone: {user?.phone}</Typography>
        <Typography variant="overline">Mobile Phone: {user?.mobile}</Typography>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography>Billing Details</Typography>
        <Typography variant="overline">
          First Name/Surname: {user?.firstName}
        </Typography>
        <Typography variant="overline">
          Last Name/Family Name: {user?.lastName}
        </Typography>
        <Typography variant="overline">Address: {user?.address1}</Typography>
        <Typography variant="overline">
          Apartment name/room #: {user?.address2 ? user?.address2 : "---"}
        </Typography>
        <Typography variant="overline">City: {user?.city}</Typography>
        <Typography variant="overline">State: {user?.state}</Typography>
        <Typography variant="overline">Postal Code: {user?.zipcode}</Typography>
        <Typography variant="overline">Home Phone: {user?.phone}</Typography>
        <Typography variant="overline">Mobile Phone: {user?.mobile}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", pb: 30, width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: 180,
          backgroundColor: "#dfdfdf",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
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
              quality={25}
              priority
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
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              mr: 2,
              mt: 15,
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>My Info</Typography>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Shipping Details</Typography>
                  <Typography variant="overline">
                    First Name/Surname: {user?.firstName}
                  </Typography>
                  <Typography variant="overline">
                    Last Name/Family Name: {user?.lastName}
                  </Typography>
                  <Typography variant="overline">
                    Address: {user?.address1}
                  </Typography>
                  <Typography variant="overline">
                    Apartment name/room #:{" "}
                    {user?.address2 ? user?.address2 : "---"}
                  </Typography>
                  <Typography variant="overline">City: {user?.city}</Typography>
                  <Typography variant="overline">
                    State: {user?.state}
                  </Typography>
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

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Billing Details</Typography>
                  <Typography variant="overline">
                    First Name/Surname: {user?.firstName}
                  </Typography>
                  <Typography variant="overline">
                    Last Name/Family Name: {user?.lastName}
                  </Typography>
                  <Typography variant="overline">
                    Address: {user?.address1}
                  </Typography>
                  <Typography variant="overline">
                    Apartment name/room #:{" "}
                    {user?.address2 ? user?.address2 : "---"}
                  </Typography>
                  <Typography variant="overline">City: {user?.city}</Typography>
                  <Typography variant="overline">
                    State: {user?.state}
                  </Typography>
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
