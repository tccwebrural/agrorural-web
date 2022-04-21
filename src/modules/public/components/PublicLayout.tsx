import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const PublicLayout = () => {
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
          backgroundColor: "aqua",
        }}
      >
        <PublicHeader />
        <Outlet />
      </Box>
    </>
  );
};

export default PublicLayout;
