import MailOutlineIcon from '@mui/icons-material/MailOutline';import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import "../../../styles/ResetPw.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ResetPwPage = (): ReactElement => {
  return (
    <>
    <div id="Block-ResetPassword">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <h2 id="Txt-ForgotPassword">Esqueceu sua senha? </h2>
          <p id="Txt-ResetPw">Para recuperar sua senha preencha o campo com o e-mail cadastrado no AgroRural.</p>

            <TextField
              placeholder='E-mail cadastrado'
              style={{width:"95%", marginTop:"10%"}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon/>
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Stack spacing={2} direction="row" >
              <Button id="btn-ResetPassword" variant="contained">Recuperar acesso</Button>
            </Stack>
            <Link id='link-VoltarResetPw' to="/sign-in">Voltar</Link>
       </Box>
      </div>
    </>
  );
};

export default ResetPwPage;
