import React, { ReactElement } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormTeste = (): ReactElement => {


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
        //coloco [] para q ele execute somente uma vez
return(
    <>
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