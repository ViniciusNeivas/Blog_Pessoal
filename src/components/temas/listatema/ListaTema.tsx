import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {

  const [temas, setTemas] = useState<Tema[]> ([])
  const token = useSelector <TokenState, TokenState["tokens"]> (

    (state) => state.tokens

      );    
      let history = useNavigate();

  useEffect (() => {

    if (token === ''){

      toast.error("Você Precisa Estar Logado!", {
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

  }, [token] )


  async function getTema() {
    await busca ("/temas", setTemas, {

      headers: {
        
      'Authorization': token
        
      }

    })

  }


  useEffect (() => {
    getTema ()
  }, [temas.length])


  return (
    <>
    {

        temas.map(tema =>(


     <Grid container className="backListaTema" justifyContent="center">     

      <Box m={8}  >
        
        <Card variant="outlined">
        
          <CardContent className="backCard" >
        
            <Typography color="textSecondary" gutterBottom align="center">
              
              Tema:
            
            </Typography>
            
            <Typography variant="h5" component="h2" align="center">
              
              {tema.descricao}
            
            </Typography>
          
          </CardContent>
          
        <Grid container justifyContent="center" className="backCard">

          <CardActions className="backCard">
            
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
               
                <Box mx={1}>
                  
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    
                    Atualizar
                  
                  </Button>
               
                </Box>
              
              </Link>

              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                
                <Box mx={1}>
                  
                  <Button variant="contained" size='small' color="secondary">
                    
                    Deletar
                  
                  </Button>
                
                </Box>
              
              </Link>
            
            </Box>
          
          </CardActions>
        
          </Grid>  

        </Card>
      
      </Box>


    </Grid>    
  ) )  
  }
    </>
  );
}


export default ListaTema;