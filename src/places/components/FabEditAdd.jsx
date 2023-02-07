import { Button, Divider, Grid, MenuItem, TextField, Typography, Box, IconButton, DialogTitle, DialogContent, Stack, List, ListItem, ListItemText, ListItemIcon, Card, CardMedia } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore/lite';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import React from 'react'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../../firebase/config';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';



export const FabEditAdd = ({ fid, closeEventEdit, actualizarEstadoPlaces }) => {
    const [lugar, setLugar] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [lng, setLng] = React.useState('');
    const [radio, setRadio] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [rango, setRango] =React.useState('');
    const [url, setUrl] = React.useState('')
    // Referencia
    const [referencia, setReferencia ] = React.useState([]);
    const [newreferencia, setNewReferencia ] = React.useState('');

    

    useEffect(() => {
    console.log('FID: ', fid.id );
    setLugar(fid.lugar);
    setEstado(fid.estado);
    setLat(fid.lat);
    setLng(fid.lng);
    setRadio(fid.radio);
  setTipo(fid.tipo);
  setReferencia(fid.referencia);
  setRango(fid.rango)
  setUrl(fid.url);
    } ,[] )

      //---------------------------Rango---------------------------

      const dentro = 'Dentro del Rango';
      const fuera = 'Fuera del Rango';
      
      ///------------------Botones de menos o más-----------------
      //Botton de más
        const handleAdd = () => { 
          if ( radio < 302 )  { setRango(dentro); }else{ setRango(fuera); }
         } 

       //Agregar una nueva referencia
       const listreferencia = () => {


        if (!newreferencia) {
        
         }else {
         setReferencia([ ...referencia, newreferencia]);
         setNewReferencia('');
        }
      
      };

      const deletereferencia = (id) => {
      
      const updatreferencia = referencia.filter((elem, ind) => {  return ind != id; });
      
      setReferencia(updatreferencia);
      }


    const onSavePlace = async ( e ) => {
        e.preventDefault();

        const placeCollection = doc(FirebaseDB, "points", fid.id);
        const data = { estado:estado, lat:Number(lat), lng:Number(lng), lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango };
        await updateDoc(placeCollection, data);
        actualizarEstadoPlaces();
        closeEventEdit();
        Swal.fire("Submitted!", "Your file has been submitted", "success")

    };

    const currencies = [
        { value: 'Disponible', label: 'Disponible' },
        { value: 'No Disponible', label: 'No Disponible', },
      ];

  return (
    <div>
            <DialogTitle>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap component='div'> Editar un Lugar </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEventEdit}> Cancelar </Button>
        </Grid>
       </DialogTitle>
        <Box sx={{ m: 1 }}/>
      <Divider />

      <DialogContent> 
      <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" >
           <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%',  m: 1, }} label="Nombre del Lugar" name="lugar" value={lugar} onChange={ (e) => setLugar(  e.target.value ) } />         
        <TextField id="outlined-basic" select variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', m: 1, }} label="Estado" name="estado" value={estado}  onChange={ (e) => setEstado( e.target.value) }>  
        {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}</TextField>
        </Stack>
        <Stack direction="row" >
        <TextField id="outlined-basic" inputProps={{ type: 'number', }} variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', m: 1, }}label="Latitud" name="lat" value={lat} onChange={ (e) => setLat( e.target.value) } />
        <TextField id="outlined-basic" inputProps={{ type: 'number', }} variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', m: 1, }} label="Longitud" name="lng" value={lng} onChange={ (e) => setLng( e.target.value) } />
       </Stack>
       <Stack direction="row" > 
        
        <TextField min="1" id="outlined-start-adornment" label="Radio" name="radio" value={radio} size="small" sx={{ width: 500, maxWidth: '20%', m: 1, }} InputProps={{ endAdornment: <IconButton color="primary" aria-label="upload picture" onClick={ handleAdd } component="label"> <RadioButtonCheckedIcon />  </IconButton> }} onChange={ (e) => setRadio( e.target.value) } />
                <TextField disabled id="outlined-basic" label="Rango" name="rango" value={rango} size="small" sx={{ width: 500, maxWidth: '30%', m: 1, }} onChange={ (e) => setRango( e.target.value) } />
                
               
                <TextField id="outlined-basic" inputProps={{ type: 'text', pattern:'[A-Za-z0-9]+@[a-z]+\.[a-z]+' }} variant="outlined"  size="small" sx={{ width: 500, maxWidth: '45%', m: 1}} label="Tipo de Tarea" name="tipo" value={tipo} onChange={ (e) => setTipo( e.target.value) }/>
              </Stack>
       
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <Box sx={{ '& button': { m: 1 } }}>

<TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 400, maxWidth: '60%',  m: 1}} InputProps={{ endAdornment: <IconButton color="primary" aria-label="upload picture" onClick={ listreferencia } component="label">  <AddCircleIcon />  </IconButton> }} multiline minRows={2} label="Referencia" name="referencia" value={newreferencia} onChange={ (e) => setNewReferencia( e.target.value) } />
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
{referencia.map( (elem, ind) => {
     return <ListItem key={ind} alignItems="flex-start" >
        <ListItemText primary={elem}  />
        <ListItemIcon >
        <IconButton onClick={() => deletereferencia(ind)} color="error"> 
           <DeleteIcon />
           </IconButton>
        </ListItemIcon>
        <Divider variant="middle" />         
      </ListItem>
      
        } )
      
    }
     
     
    </List>
    </Box>
     </Grid>
    <Grid item xs={6}>  
    <Card>
       <CardMedia
         component="img"
         alt="green iguana"
         height="140"
         image={url}
       />
     </Card>
      </Grid>

       
        
  
          </Grid>      
    </Box>
    </DialogContent>
    <Box sx={{ m: 2 }}/>
    <Divider />
 <Box m={1} display="flex" justifyContent="center" alignItems="center">
   <Button  variant="outlined" size="medium" sx={{ height: 40 }} onClick={ onSavePlace }>  Guardar </Button>
 </Box>
    </div>

  
  )
}
