import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import  getAllPlaces from '../../store/places/getAllPlaces';
import { ModalLayout } from '../layout/ModalLayout';
import {  FabEditAdd, FabShow } from '../components';
import { useEffect } from 'react';
import FabDelete from '../components/FabDelete';
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Grid, IconButton, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
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
    //-------------------------Modales---------------------------------------
    //-------------------Capturar información------------------------------
     const [formid, setFormid] =React.useState("");
    //----------------------Modal de Editar---------------------------------
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    //Capturar la información de tabala
    const editData = (id, lugar, estado, latitud, longitud, radio, tipo, referencia) => {
    const data = { id:id, estado:estado, latitud:latitud, longitud:longitud, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo };
    setFormid(data);
    handleOpenEdit(); 
    }
    
    //----------------------Modal de Editar---------------------------------
    const [openShow, setOpenShow] = React.useState(false);
    const handleOpenShow = () => setOpenShow(true);
    const handleCloseShow = () => setOpenShow(false);
    //Capturar la información de tabala
    const showData = (id, lugar, estado, latitud, longitud, radio, tipo, referencia) => {
    const datashow = { id:id, estado:estado, latitud:latitud, longitud:longitud, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo };
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
 point.estado, point.latitud, point.longitud, point.radio, point.tipo, point.referencia) }} component="label">
 <EditIcon/>
 </IconButton>
 <IconButton color="show" aria-label="upload picture" onClick={() => { showData(point.id, point.lugar, 
 point.estado, point.latitud, point.longitud, point.radio, point.tipo, point.referencia) }} component="label">
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
    <Modal
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalLayout, width: '50%' }}>
      <FabEditAdd closeEventEdit={handleCloseEdit} fid={formid} actualizarEstadoPlaces={actualizarEstadoPlaces} />
      </Box>
    </Modal>
{/* Modal de Mostrar */}
<Modal
      open={openShow}
      onClose={handleCloseShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...ModalLayout, width: '80%' }}>
      <FabShow closeEventEdit={handleCloseShow} fid={formid} />
      </Box>
    </Modal></div>
  )
}
