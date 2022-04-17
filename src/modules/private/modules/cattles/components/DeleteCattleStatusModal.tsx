import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const DeleteCattleStatusModal = (): ReactElement => {
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

export default DeleteCattleStatusModal;
