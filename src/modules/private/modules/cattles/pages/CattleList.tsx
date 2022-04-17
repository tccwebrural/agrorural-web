import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const CattleListPage = (): ReactElement => {
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
      <Typography variant="h3">CattleList</Typography>
    </Box>
  );
};

export default CattleListPage;
