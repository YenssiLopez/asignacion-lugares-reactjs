import React, { useState } from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FabAddNew, FabEditAdd, FabShow } from '../components';
import { useEffect } from 'react';
import FabDelete from '../components/FabDelete';
import { Autocomplete, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Dialog, Grid, IconButton, InputBase, Modal, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';


export const Cardlist = () => {

  //----------------obtener los datos de firebase----------------------
  const [points, setPoints] = useState([]);
  
  const actualizarEstadoPlaces = async () => {
    const collectionRef = collection(FirebaseDB, "points");
  const q = query(collectionRef, orderBy("timestamp", "desc"))
    const data = await getDocs(q);
    setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    actualizarEstadoPlaces();
  }, []);

   //-----------------Buscadores----------------------------------------
   const filterData = (v) => {
    if (v) {
      setPoints([v]);
    } else {
      actualizarEstadoPlaces();
    }
  };

//-----------------------------------------------------------------------
//-------------------------Dialogos---------------------------------------
//--------------------------------------------------------------------------
//--------------------Tamaños de los dialogos-------------------------------
const [fullWidth] = React.useState(true);
const [maxWidth] = React.useState('md');
//----------------------Dialogos de Agregar---------------------------------
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
//-------------------Capturar información------------------------------
const [formid, setFormid] =React.useState("");
//----------------------Dialogos de Editar---------------------------------
const [openEdit, setOpenEdit] = React.useState(false);
const handleOpenEdit = () => setOpenEdit(true);
const handleCloseEdit = () => setOpenEdit(false);
//Capturar la información de tabala
const editData = (id, lugar, estado, lat, lng, radio, tipo, referencia, rango, url) => {
const data = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango, url:url };
setFormid(data);
handleOpenEdit(); 
}

//----------------------Dialogos de Mostrar---------------------------------
const [openShow, setOpenShow] = React.useState(false);
const handleOpenShow = () => setOpenShow(true);
const handleCloseShow = () => setOpenShow(false);
//Capturar la información de tabala
const showData = (id, lugar, estado, lat, lng, radio, tipo, referencia, rango, url) => {
const datashow = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango, url:url };
setFormid(datashow);
handleOpenShow(); 
}



  return (
    <div>
 {points.length > 0 && (
           <Box sx={{ width: '100%' }}>
      <Toolbar>
    
    <Typography
      sx={{ flex: '1 1 100%' }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      Tarjetas de Lugares
    </Typography>
    <Stack direction="row" spacing={2} className="my-2 mb-2"><FilterListIcon sx={{ fontSize: 30 }} />
            <Autocomplete
              id="country-select-demo"
              options={points}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(points) => points.lugar || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Filtrar Lugar" />
              )}
            />
            
          </Stack>
 

      

</Toolbar>
<Box sx={{ m: 2 }}/>
<Typography variant="body2" color="text.secondary"> 
        Trajetas de Lugares que están registrado o registrar un nuevo Lugar
        </Typography>
        <Box sx={{ m: 3 }}/>
<Button sx={{ right: -15, bottom: 10 }} onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />}>Agregar</Button>


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



    </Box>    
)}
     {/* Modal de ingresar */}
     <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FabAddNew closeEvent={handleClose} actualizarEstadoPlaces={actualizarEstadoPlaces} />
        
      </Dialog>
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
        <FabShow closeEventShow={handleCloseShow} fid={formid} actualizarEstadoPlaces={actualizarEstadoPlaces} />
       
      </Dialog>

      
    </div>
  )
}
