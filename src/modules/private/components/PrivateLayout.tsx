import { Box, CssBaseline } from "@mui/material";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import PrivateHeader from "./PrivateHeader";

const PrivateLayout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
        }}
      >
        <PrivateHeader />
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateLayout;