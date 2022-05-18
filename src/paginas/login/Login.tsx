import React, { ChangeEvent, useEffect }  from 'react';
import { useState } from "react";
import './Login.css';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from "../../models/UserLogin";
import { login } from '../../services/Service';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login() {

    let history = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState ('');

    const [userLogin, setUserLogin] = useState<UserLogin> (
        
        {
            id: 0,
            usuario: '',  
            senha: '',   
            token: '',
         }
    )

         useEffect(() => {
             if (token !==""){
                 dispatch (addToken(token))
                 history ('/home')
             }
         }, [token])   

    
    
    function updatedModel (e: ChangeEvent<HTMLInputElement>) {

         setUserLogin ( {                       // Alteração de Dados
                ...userLogin,                   //Espalha os dados
                [e.target.name]: e.target.value
         } )
        }          
    

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        
        e.preventDefault();

        try {

            await login(`/usuarios/logar`, userLogin, setToken)
            
            toast.success("Usuário Logado Com Sucesso !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
     
            });
            
            
    
            // const resposta = await api.post(`/usuarios/logar, userLogin`)
            // setToken(resposta.data.token)

            

        } catch (error) {

            toast.error("Dados do Usuário Inconsistentes. Erro ao Logar !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
     
            });

        }

    }


    return (




 
        <Grid container direction='row' justifyContent='center' alignItems='center' >

            <Grid alignItems='center' xs = {6} >
                
                <Box paddingX={20} >
                    
                    <form  onSubmit = {onSubmit} >

                        <Typography variant = 'h3' gutterBottom color = 'textPrimary' component = 'h3' align = 'center' className='txtEntrar'>
                        
                            Entrar
                            
                        </Typography>
                        
                        <TextField  value={userLogin.usuario}
                        
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                             id='usuario' label='Usuário' variant='outlined' name='usuario' 
                             margin='normal' placeholder='Digite Seu E-mail de Usuário.' 
                             required fullWidth />
                        
                        <TextField  value={userLogin.senha}   
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='senha' label='Senha' variant='outlined' name='senha' 
                        margin='normal' type='password' placeholder='Senha Com No Mínimo 8 Dígitos'
                        required fullWidth />
                       
                        <Box marginTop={2} textAlign='center'>
                            
                                <Button type='submit' variant='contained'  color='primary' >
                                    
                                    Logar
                                
                                </Button>    
                            
                        </Box>    

                    </form>
                    <Box  display= 'flex' justifyContent= 'center' marginTop={2}>
                        <Box marginRight={1}>
                            
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Não Tem Uma Conta!?</Typography>
                        
                        </Box>

                        <Link to='/cadastroUsuario'>

                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Bora Cadastrar!?</Typography>

                        </Link>

                        

                    </Box> 
                </Box>
            
            </Grid>
                 
                <Grid xs={6} className = 'imagem'  >
                
                 </Grid>


        </Grid>




    );
}
export default Login;