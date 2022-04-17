import { AccountCircle } from "@mui/icons-material";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const ResetPwPage = (): ReactElement => {
  return (
    // <Box
    //   sx={{
    //     flexGrow: 1,
    //     backgroundColor: "whitesmoke",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Typography variant="h3">ResetPw</Typography>
    // </Box>

    // <Box
    //   sx={{
    //     width: 500,
    //     maxWidth: "100%",

    //   }}
    // >
    //   <TextField fullWidth label="Informe o email" id="fullWidth" />
    // </Box>
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <TextField
        id="input-with-icon-textfield"
        label="digite seu email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Box>
  );
};

export default ResetPwPage;
