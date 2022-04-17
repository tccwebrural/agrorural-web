import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useAuth } from "../../../../../providers/AuthProvider";

const HomePage = (): ReactElement => {
  const authContext = useAuth();
  console.log(authContext.user);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Cockpit</Typography>
    </Box>
  );
};

export default HomePage;
