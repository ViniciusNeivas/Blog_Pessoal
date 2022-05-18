import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListaPostagem.css';


import { busca } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {

  const [posts, setPosts] = useState<Postagem[]> ([])
 
  let history = useNavigate();

  const token = useSelector <TokenState, TokenState["tokens"]> (

    (state) => state.tokens

);

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

  async function getPost() {
    await busca ("/postagens", setPosts, {

      headers: {
        
      'Authorization': token
        
      }

    })

  }

  useEffect (() => {
    getPost ()
  }, [posts.length])


  return (
    <>
    {

        posts.map(post =>(

<Grid container className="backListaPost" justifyContent="center"  >
      
      <Box m={2} >
      
        <Card variant="outlined" >
      
          <CardContent className="backCard">
            
            
            <Typography color="textSecondary" gutterBottom align="center">
              
              Postagens:
            
            </Typography>

            <Typography variant="h5" component="h2" align="center">
            
              {post.titulo}
            
            </Typography>

            <Typography variant="h5" component="h2" >
            
              {post.texto}
            
            </Typography>

            <Typography variant="h5" component="h2" align="center">
            
              {post.tema?.descricao}
            
            </Typography>

          </CardContent>

        <Grid container justifyContent="center" className="backCard" >
          
          <CardActions className="backCard" >
      
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none">
                
                <Box mx={1}>
                  
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                
                    Atualizar
                
                  </Button>
                
                </Box>
      
              </Link>

              <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
            
                <Box mx={1}>
            
                  <Button variant="contained" size='small' color="secondary">
                    
                    deletar
                  
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