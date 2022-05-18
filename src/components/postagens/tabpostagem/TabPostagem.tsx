import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
   
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        
        <AppBar position="static" className='tabModal' >
          
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
           
            <Tab label="Todas as postagens" value="1"/>
           
            <Tab label="Sobre Mim" value="2" />
          
          </Tabs>
        
        </AppBar>
        
        <TabPanel value="1" >
          
          <Box display="flex" flexWrap="nowrap" justifyContent="center">  
          
            <ListaPostagem />
          
          </Box>
        
        </TabPanel>
        
        <TabPanel value="2">
          
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="txtSobreMim" >
          
            SOBRE MIM
          
          </Typography>
          
          <Typography variant="body1" gutterBottom color="textPrimary" align="center" className="txtSobreMim1" >
           
          Eu tenho 30 anos, venho da área de elétrica, formado como eletricista de manutenção, técnico em eletroeletrônica pelo SENAI e engenharia elétrica pela Uninove. Liderei a reta final da revitalização do áudio do arena do Palmeiras. Sempre próximo a programação, agora busco novo ares nesse novo meio.         
          
          </Typography>
        
        
        </TabPanel>
      
      </TabContext>
    </>
  );
}
export default TabPostagem;