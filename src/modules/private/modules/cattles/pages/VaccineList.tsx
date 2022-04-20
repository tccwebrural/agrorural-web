import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

const VaccineListPage = (): ReactElement => {
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
      <Typography variant="h3">VaccineList</Typography>
    </Box>
  );
};

export default VaccineListPage;
