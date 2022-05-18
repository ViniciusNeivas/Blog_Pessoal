import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Grid } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';

import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CadastroPost() {
 
    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector <TokenState, TokenState["tokens"]> (

        (state) => state.tokens
       
    );
    

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })


    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data:'',
        tema: null
    })

    useEffect(() => {
        if (token === "") {
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

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
            
                
                toast.success("Postagem Atualizada Com Sucesso", {
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
            
                toast.error("Erro ao Atualizar, Verifique Os Campos", {
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

        } else {
            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        'Authorization': token
                    }
                })
                

                toast.success("Postagem Cadastrada Com Sucesso", {
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
            
                toast.error("Erro ao Cadastrar, Verifique os Campos", {
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
        history('/posts')
    }

    return (
        
        <Container maxWidth="sm" className="topo" >
            
            <form onSubmit={onSubmit}>
                
                <Typography variant="h3" color="textSecondary" component="h1" align="center" className="tituloForm">
                    
                    Formulário 
                
                </Typography>
                
                
                <Typography variant="h3" color="textSecondary" component="h1" align="center" className="tituloForm">
                    
                    Cadastro  de Postagem
                
                </Typography>
                            

                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} 
                id="titulo" label="Titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} 
                id="texto" label="Texto" name="texto" variant="outlined" margin="normal" fullWidth />

              <Grid container justifyContent="center">
              
                <FormControl>
                   
                    <InputLabel id="demo-simple-select-helper-label">
                        
                        Tema
                        
                    </InputLabel>
                   
                    <Select
                    
                        
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(item => (
                                <MenuItem value={item.id}>{item.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    
                    <FormHelperText>
                    
                        Escolha Um Tema Para A Postagem
                    
                    </FormHelperText>
                    
                    <Button type="submit" variant="contained" color="primary"  >
                        
                        Finalizar
                    
                    </Button>
                
                </FormControl>
            </Grid>                   

            </form>
        
        </Container>
    )

    
}
export default CadastroPost;