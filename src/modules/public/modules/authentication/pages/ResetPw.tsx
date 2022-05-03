import MailOutlineIcon from '@mui/icons-material/MailOutline';import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { ReactElement,useState } from "react";
import "../../../styles/ResetPw.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';
import { Formik } from 'formik';
import { ResetPwValidatorSchema } from '../validators/ResetPwValidatorSchema';
import { getControls } from 'utils/FormUtils';

const ResetPwPage = (): ReactElement => {
  const auth = useAuth();
  const [initialValues, setInitialValues] = useState({
    email:" "
  });

  const submitResetPassword = () => { 
    auth.sendPasswordReset("jogos_townsend@hotmail.com").then(()=>{

    })
  }

  return (
    <>
    <Formik
      enableReinitialize={true}
      onSubmit={submitResetPassword}
      initialValues={initialValues}
      validationSchema={ResetPwValidatorSchema}
    >
     {(formik)=>( 
       <form onSubmit={formik.handleSubmit}>
<div id="Block-ResetPassword">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <h2 id="Txt-ForgotPassword">Esqueceu sua senha? </h2>
            <p id="Txt-ResetPw">Para recuperar sua senha preencha o campo com o e-mail cadastrado no AgroRural.</p>

              <TextField
                type="email"
                {...getControls(formik,"email")}
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
              <Button id="btn-ResetPassword" variant="contained" type="submit">Recuperar acesso</Button>
              </Stack>
              <Link id='link-VoltarResetPw' to="/sign-in">Voltar</Link>
        </Box>
      </div>
       </form>
      
      )} 
     
    </Formik>
      
    </>
  );
};

export default ResetPwPage;
