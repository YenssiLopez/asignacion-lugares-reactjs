import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import  getAllPlaces from '../../store/places/getAllPlaces';
import {  FabEditAdd, FabShow } from '../components';
import { useEffect } from 'react';
import FabDelete from '../components/FabDelete';
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Dialog, Divider, FormControl, Grid, IconButton, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import filtrarDatos from '../../store/places/filtrarDatos';
import { useFrom } from '../../hooks/useFrom';


export const Searchlist = () => {
    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );
    
      //----------------obtener los datos de firebase----------------------
      const [points, setPoints] = useState([]);
    
    
      async function  actualizarEstadoPlaces() {
        const nvosDocus = await filtrarDatos(q);
     getAllPlaces().then((points) => {
     setPoints(nvosDocus, points);
    
    });
    
      }
    
      useEffect(() => {
        actualizarEstadoPlaces(q);
    
      }, []);
    
    
      //-----------------Buscadores----------------------------------------
    
      const navigate = useNavigate();
      
    
      const showError  = (q.length > 0) && points.length === 0;
      
      const showSearch = (q.length === 0);
    
      const { buscarlugar, onInputChange } = useFrom({
        buscarlugar: q
      });
    
    
    //  const [buscarlugar, setBuscarLugar ] = useState('');

    
    
    //Botón de busqueda
    async function busquedaFormHandler (e) {
      e.preventDefault();
    
      const nvosDocus = await filtrarDatos(buscarlugar);
      setPoints(nvosDocus);
      
    navigate(`?q=${ buscarlugar }`);
    
    };


     
    
    //-----------------------------------------------------------------------
//-------------------------Dialogos---------------------------------------
//--------------------------------------------------------------------------
//--------------------Tamaños de los dialogos-------------------------------
const [fullWidth] = React.useState(true);
const [maxWidth] = React.useState('md');
     const [formid, setFormid] =React.useState("");
    //----------------------Modal de Editar---------------------------------
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    //Capturar la información de tabala
    const editData = (id, lugar, estado, lat, lng, radio, tipo, referencia, rango,url) => {
    const data = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango, url:url };
    setFormid(data);
    handleOpenEdit(); 
    }
    
    //----------------------Modal de Editar---------------------------------
    const [openShow, setOpenShow] = React.useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);
    //Capturar la información de tabala
    const showData = (id, lugar, estado, lat, lng, radio, tipo, referencia, rango,url) => {
    const datashow = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango, url:url };
    setFormid(datashow);
    handleOpenShow(); 
    }

  return (
    <div>      
<Box sx={{ width: '100%' }}>
  <Paper sx={{ width: '100%' }}>
     <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div"> Buscar Lugar </Typography>
     <Box sx={{ m: 2 }}/>
     <Typography variant="body2" color="text.secondary"> Busca tu lugar favorito </Typography>
     <Box sx={{ m: 2 }}/>
     <Box sx={{ '& button': { m: 1 } }}>

        <FormControl sx={{ width: '40ch' }}>
          <TextField  id="outlined-basic" label="Buscar un Lugar" variant="outlined" name="buscarlugar" value={ buscarlugar } onChange={ onInputChange } />
        </FormControl>
        <Button variant="outlined" size="medium" startIcon={<SearchIcon />} onClick={ busquedaFormHandler }> 
           Buscar
        </Button>
     


     </Box>
   <Box sx={{ m: 2 }}/>
    <Divider/>
<Box sx={{ mb: 1 }}>
    <Typography
    sx={{ flex: '1 1 100%' }}
    variant="h6"
    id="tableTitle"
    component="div"
  >
   Resultados
  </Typography>
  </Box>
  <Divider/>
  <Box sx={{ m: 2 }}/>
<Stack sx={{ width: '100%' }} spacing={1}>
    <Alert variant="filled" severity="error" style={{ display: showError ? '' : 'none' }}>
    Ningún lugar con — { q }
    </Alert>

    <Alert variant="filled" severity="info" style={{ display: showSearch ? '' : 'none' }}>
    Buscar un lugar
    </Alert>
  </Stack>




  <Grid container spacing={2} direction="row">

{
        points.map((point) => (
          <Grid item xs={3} key={point.id}>
          <Card >
       <CardMedia
         component="img"
         alt="green iguana"
         height="140"
         image={point.url}
       />
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
           {point.lugar}
         </Typography>
         <Typography variant="body2" color="text.secondary">
           Estado: {point.estado}
         </Typography>
         <Typography variant="body2" color="text.secondary">
           Longitud y Latitud: {point.lng}, {point.lat}
         </Typography>
         <Typography variant="body2" color="text.secondary">
           Tipo de Lugar: {point.tipo}
         </Typography>
       </CardContent>
       <CardActions>
       
       <ButtonGroup>
 
         
 <IconButton color="edit" aria-label="upload picture" onClick={() => { editData(point.id, point.lugar, 
 point.estado, point.lat, point.lng, point.radio, point.tipo, point.referencia, point.rango, point.url) }} component="label">
 <EditIcon/>
 </IconButton>
 <IconButton color="show" aria-label="upload picture" onClick={() => { showData(point.id, point.lugar, 
 point.estado, point.lat, point.lng, point.radio, point.tipo, point.referencia, point.rango, point.url) }} component="label">
 <VisibilityIcon/>
 </IconButton>
 <IconButton color="error" aria-label="upload picture" onClick={() => { FabDelete(point, actualizarEstadoPlaces) }} component="label">
 <DeleteIcon/>
 </IconButton>
           </ButtonGroup>
           
       </CardActions>
     </Card>
 
 
 
 
   </Grid>
        )
      )}

</Grid>
  




</Paper>
  </Box>    


    {/* Modal de editar */}
    <Dialog
      open={openEdit}
      onClose={handleCloseEdit}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FabEditAdd closeEventEdit={handleCloseEdit} fid={formid} actualizarEstadoPlaces={actualizarEstadoPlaces} />
    </Dialog>
{/* Modal de Mostrar */}
<Dialog
      open={openShow}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FabShow closeEventShow={handleCloseShow} fid={formid} actualizarEstadoPlaces={actualizarEstadoPlaces}  />
  
    </Dialog></div>
  )
}
