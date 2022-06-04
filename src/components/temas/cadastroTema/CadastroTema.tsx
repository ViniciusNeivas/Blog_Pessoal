import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button, Grid, Box } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import './CadastroTema.css';


function CadastroTema() {
  
    let history = useNavigate ();
    const {id}= useParams<{id:string}>();
    const token = useSelector <TokenState, TokenState["tokens"]> (

        (state) => state.tokens
    );
    const [tema,setTema] = useState<Tema>({

        id:0,
        descricao: ''

    })

    useEffect (() =>{

        if (token === "") {


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

    }, [token])

    
    
    useEffect (() =>{

        if (id !== undefined) {
            findById(id)

        }

    }, [id])


    async function findById (id:string) {
        
        await buscaId(`/temas/${id}`, setTema,{
            headers:{

            'Authorization': token

        }
        })

    }

        function updatedModel (e: ChangeEvent<HTMLInputElement> ) {

        setTema ({
            ...tema,
            [e.target.name]: e.target.value,
            
        })
 
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("temas " + JSON.stringify(tema))

        if (id !== undefined) {
            
            console.log(tema)
           
            try {
            await put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            
            toast.success("Tema Cadastrado Com Sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
     
            });


            
        } catch (error) {

            console.log(`Error: ${error}`)

            toast.error("Erro, Por Favor Verifique A Quantidade Mínima de Caracteres", {
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
        }else {
            
            try {

           await post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            
            toast.success("Tema Cadastrado Com Sucesso", {
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

        catch (error) {
            console.log(`Error: ${error}`)
           
            toast.error("Erro, por favor verifique a quantidade minima de caracteres", {
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
        back()

    }

    function back() {
        history ('/temas')
    }




    return (
        
       <Grid item xs={12}  className="backFormTema container1">



            <Container>


              <Box className='cor card glass' >

                    <form onSubmit={onSubmit} >
               
                        <Typography variant="h3" color="textSecondary" component="h1" align="center" className="tituloFormTema">
                   
                            Formulário 
                
                        </Typography>

               
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" className= "tituloFormTema" >
                   
                        Cadastro de Tema
                
                    </Typography>

                    <TextField value={tema.descricao} onChange ={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao" label="Descrição do Tema" variant="outlined" 
                    placeholder='Digite o Tema' name="descricao" margin="normal" fullWidth />
               
                    <Grid container justifyContent="center">
                
                         <Button type="submit" variant="contained" color="primary" >
                   
                            Finalizar
                    
                        </Button>
           
                    </Grid> 
               </form>
        
            </Box>
            
            </Container>

        </Grid> 
    
    )

}

export default CadastroTema; 