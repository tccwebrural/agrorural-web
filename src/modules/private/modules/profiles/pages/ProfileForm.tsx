import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const ProfileFormPage = (): ReactElement => {
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
      <Typography variant="h3">ProfileForm</Typography>
    </Box>
  );
};

export default ProfileFormPage;
