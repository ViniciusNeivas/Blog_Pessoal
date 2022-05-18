import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography,  Grid, Box } from '@material-ui/core';
import './Footer.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function Footer() {
   
   const token = useSelector <TokenState, TokenState ["tokens"]>(
        (state) => state.tokens
   
      );

   var footerComponent;
   
    if (token !== "") {

        footerComponent =  <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
            
            <Box className='box1'>
                
                <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                
                    <Typography variant="h5" align="center" gutterBottom className='textosRedes'>
                
                        Siga-nos Nas Redes Sociais 
                
                    </Typography>
                
                </Box>
                
                <Box display="flex" alignItems="center" justifyContent="center">
                
                    <a href="https://www.facebook.com/vinicius.dos.s.neivas" target="_blank">
                        <FacebookIcon className='redes' />
                    </a>
                   
                    <a href="https://www.instagram.com/vinicius.westside/" target="_blank">
                        <InstagramIcon className='redes'/>
                    </a>
                   
                    <a href="https://www.linkedin.com/in/viniciusneivas/" target="_blank">
                        <LinkedInIcon className='redes'  />
                    </a>
                
                </Box>
            
            </Box>
            
            <Box className='box2'>
              
                <Box paddingTop={1}>
              
                    <Typography variant="subtitle2" align="center" gutterBottom className='textosCopy'>
                    
                        © 2022 Copyright
                        
                    </Typography>
              
                </Box>
              
                <Box>
                    
                    <a target="_blank" href="https://brasil.generation.org" className='text-decorator-none'>
                        
                        <Typography variant="subtitle2" gutterBottom className='textosCopy' align="center">
                        
                            brasil.generation.org
                        
                        </Typography>
                    
                    </a>
                
                </Box>
            
            </Box>
        
        </Grid>
    
    </Grid>

    }

    return (
        <>

        {footerComponent}  
        
        </>
    )
}

export default Footer;