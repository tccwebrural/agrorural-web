import React, { ReactElement } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const FormTeste = (): ReactElement => {
    const [openDeleteVaccine, setOpenDeleteVaccine] = React.useState(false);
    const handleOpenDeleteVaccine = () => setOpenDeleteVaccine(true);
    const handleCloseDeleteVaccine = () => setOpenDeleteVaccine(false);

    
const formik = useFormik({  //essa variavel é um objeto com um monte de propriedades,
                            // uma das propriedades será o "values" q é um objeto em si que contem os valores abaixo do initialValues (user, email...)
    initialValues: {  //defini os valores iniciais
        user: '',    //inicialmente ele será uma string vazia
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        user: Yup.string()
        .max(15, "o nome não pode passar de 15 caracteres")
        .required("Necessário preencher o campo"),
        
        email: Yup.string()
        .email( "email invalido")
        .required("Necessário preencher o campo")
    }),
    onSubmit: (values) => {
       console.log(formik.values)
    }
});
 
console.log(formik.errors);

const [contar, setContar] = React.useState(0);
console.log("executou fora")

React.useEffect(() => {  //esse é o 1* argumento do useEffect q é uma função q esta sendo executada
    console.log('Executou')
},[] ); //a vantagem do useEffect esta nesse segundo argumento dele q é um array de dependencia (quando mudar o item q eu colocar dentro [] execute todo esse useEffect novamente, e senao mudar nao execute novamente )
        //coloco [] para q ele execute somente uma vezyarzz
return(
    <>
     <div>
      <Button onClick={handleOpenDeleteVaccine}>Deletar</Button>
      <Modal
        open={openDeleteVaccine}
        onClose={handleCloseDeleteVaccine}
        
      >
        <Box sx={style}>
        <Grid sx={{ margin: "2%  2%" }}>
                <span>
                  Você realmente deseja excluir essa vacina?
                </span>
              </Grid>
              <Grid
                sx={{
                  margin: "2%  15% 2% 2%",
                  display: "flex",
                }}
              >
                <p>
                  Após a exclusão não será possível recuperar os dados desta vacina
                </p>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  margin: " 1%",
                  justifyContent: "center",
                }}
              >
                <Grid
                  sx={{
                    margin: " 6% 1%",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    id="btn-modalDelet"
                  >
                    Sim
                  </Button>{" "}
                </Grid>
                <Grid
                  sx={{
                    margin: " 6% 1%",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    id="btn-modalCancel"
                  >
                    Não
                  </Button>{" "}
                </Grid>
              </Grid>
        </Box>
      </Modal>
    </div>
    <button onClick={() => setContar(contar +1)}>{contar}</button>
    
    <h2 style={{margin:"auto"}}>Formulário</h2>
    <form   onSubmit={formik.handleSubmit}
            className="Form" 
            style={{margin:"auto", background:"teal",height:430,width: 350, display:"flex", alignItems:"center", justifyContent:"center"}} >
            
        <div>
        <div>
            <input  
                name="user" 
                placeholder="UserName" 
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user}
                style={{marginBottom:5,height:30 }}
            />
            {formik.errors.user ? <p>{formik.errors.user} </p> : null}
        </div>
        <div>
            <input 
                name="email" 
                placeholder="email" 
                type="email"
                onChange={formik.handleChange} //lida com mudanças quando alterar o valor 
                value={formik.values.email}  //ligação bidirecional o valor tbn deve ser igual ao primeiro nome
                style={{marginBottom:5,height:30 }}
            />
            {formik.errors.email ? <p>{formik.errors.email} </p> : null}
            {/* exibe o erro em baixo do input se tiver erro, se nao ele nao exibe nada */}
        </div>
        <div>
            <input 
                name="password" 
                placeholder="Password" 
                type={"password"}
                onChange={formik.handleChange}
                value={formik.values.password}
                style={{marginBottom:25,
                        height:30,

                }}
            />
        </div>
        <button 
                type='submit'
                style={{marginLeft:35, background:"var(--cor003)"}}
        >Login</button>
    </div>
   </form>
   </>
    );
};

export default FormTeste;