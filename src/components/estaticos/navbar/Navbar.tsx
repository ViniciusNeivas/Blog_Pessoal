import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify'
import { ColorizeRounded } from '@mui/icons-material';

function Navbar() {
   
   let history = useNavigate ();
   const dispatch = useDispatch ();
   const token = useSelector <TokenState, TokenState["tokens"]> (

    (state) => state.tokens

   );

   function goLogout(){

       dispatch(addToken(''))
       toast.info("Usuário Deslogado", {
           position: "top-right",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: false,
           theme: "colored",
           progress: undefined,

       });

    history ('/login')
}
   
    var navbarComponent;

        if (token !== ""){

            navbarComponent = <AppBar position="static" className='back'>
                
            <Toolbar variant="dense">
               
                <Box className = 'cursor'>
                    
                    <Typography variant="h5" color="inherit">
                        Blog Pessoal
                    </Typography>
                
                </Box>


                <Box display="flex" justifyContent="start">
                    
                    <Link to ="/home" className='text-decorator-none'>
                    
                        <Box mx={1} className = 'cursor button:hover button:active button' >
                    
                            <Typography variant="h6" color="inherit">
                              HOME
                            </Typography>
                    
                        </Box>

                    </Link>
                    
                    <Link to ="/posts" className='text-decorator-none '>

                         <Box mx={1} className = 'cursor button:hover button:active button' >
                    
                            <Typography variant="h6" color="inherit">
                                POSTAGEM
                            </Typography>
                    
                         </Box>
                         
                    </Link>

                
                    <Link to ="/temas" className='text-decorator-none'>

                        <Box mx={1} className = 'cursor button:hover button:active button' >
                    
                            <Typography variant="h6" color="inherit">
                                TEMAS
                             </Typography>
                    
                        </Box>
                    </Link>


                    <Link to ="/formularioTema" className='text-decorator-none'>

                         <Box mx={1}className = 'cursor button:hover button:active button' >
                    
                            <Typography variant="h6" color="inherit">
                              
                              CADASTRAR TEMA
                            
                            </Typography>
                
                        </Box>

                    </Link>

                       
                        <Box mx={1} className = 'cursor button:hover button:active button' onClick={goLogout}>

                            <Typography variant="h6" color="inherit">
                               
                                LOGOUT
                           
                            </Typography>

                        </Box>

                    
                    
                </Box>

            </Toolbar>
        
        </AppBar>




        }

    return (
        <>
            
            {navbarComponent}
        
        </>
    )
}

export default Navbar;