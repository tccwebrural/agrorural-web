import { Box, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import React, { ReactElement } from "react";
import { string } from "yup/lib/locale";

const UpdateCattleStatusModal = (): ReactElement => {
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
      <Typography variant="h3">Modal</Typography>
    </Box>
  );
};

export default UpdateCattleStatusModal;
