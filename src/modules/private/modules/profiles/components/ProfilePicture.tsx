import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const ProfilePictureComponent = (): ReactElement => {
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
      <Typography variant="h3">Profile picture component</Typography>
    </Box>
  );
};

export default ProfilePictureComponent;
