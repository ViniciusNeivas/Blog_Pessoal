import React, { useEffect } from 'react';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import './Home.css';
import musica from '../../assets/images/musica.jpg'
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function Home() {
    
    let history = useNavigate();
    const token = useSelector <TokenState, TokenState["tokens"]> (

        (state) => state.tokens

    );
    
    useEffect(() => {
      
        if (token == "") {
            toast.error("Você Precisa Estar Logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
     
            });


          history("/login")
  
      }
  }, [token])
    
    
    return (
        <>
            <Grid container  direction="row" justifyContent="center" alignItems="center" >
                
                <Grid alignItems="center" item xs={12}  className="background" >
                   
                    <Box paddingX={20} paddingTop ={10}>
                        
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className = 'texto1' >
                        
                            Seja Bem Vindo(a)!
                        
                        </Typography>
                        
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className = 'texto2' > 
                            
                            <p>Expresse Aqui <br /> Os Seus Pensamentos <br /> E <br /> Opiniões !</p> 
                        
                        </Typography>
                    
                    </Box>
                    
                    <Box display="flex" justifyContent="center">
                        
                        <Box marginRight={1}>
                        
                            <ModalPostagem/>
                            
                        
                        </Box>
                        
                        <Link to = "/posts" className='text-decorator-none'>
                        
                            <Button variant="outlined" className = 'botao txtVerPostagens ' >
                        
                                Ver Postagens
                    
                            </Button>
                
                        </Link>

                        
                    </Box>
                
                </Grid>
                
                <Grid item xs={12} >
                    {/* <img src= {musica} alt="Musica" width="500px" height="500px" /> */}
                </Grid>
                
                <Grid xs={12} className = 'postagens' >
                
                        <TabPostagem />
                
                </Grid>
            
            </Grid>
        </>
    );
}

export default Home;