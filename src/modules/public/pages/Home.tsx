import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const HomePage = (): ReactElement => {
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
      <Typography variant="h3">Home</Typography>
    </Box>
  );
};

export default HomePage;
