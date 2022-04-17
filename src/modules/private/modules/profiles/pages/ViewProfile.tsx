import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const ViewProfilePage = (): ReactElement => {
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
      <Typography variant="h3">ViewProfile</Typography>
    </Box>
  );
};

export default ViewProfilePage;
