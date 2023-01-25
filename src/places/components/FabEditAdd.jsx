import { Button, Divider, Grid, MenuItem, TextField, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import {  doc, updateDoc } from 'firebase/firestore/lite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../../firebase/config';



export const FabEditAdd = ({ fid, closeEventEdit, actualizarEstadoPlaces }) => {
    const [lugar, setLugar] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [lng, setLng] = React.useState('');
    const [radio, setRadio] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [referencia, setReferencia] = React.useState('');
    const [rango, setRango] =React.useState('');

    

    useEffect(() => {
    console.log('FID: ', fid.id );
    setLugar(fid.lugar);
    setEstado(fid.estado);
    setLat(fid.lat);
    setLng(fid.lng);
    setRadio(fid.radio);
  setTipo(fid.tipo);
  setReferencia(fid.referencia);
    } ,[] )

      //---------------------------Rango---------------------------

      const dentro = 'Dentro del Rango';
      const fuera = 'Fuera del Rango';
      
      ///------------------Botones de menos o más-----------------
      //Botton de más
      const handleAdd = () => { 
        
        setRadio(radio + 1); 
        
        if ( radio < 102 )  {
        setRango(dentro);
        }else{
          setRango(fuera);
        }
  
  
      } 
  
      //Botton de menos
      const disaggregate = () => { 
        setRadio(radio - 1); 
      
        if ( radio < 102 )  {
          setRango(dentro);
          }else{
            setRango(fuera);
          }
      
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
        {
          value: 'Disponible',
          label: 'Disponible',
        },
        {
          value: 'No Disponible',
          label: 'No Disponible',
        },
      ];

  return (
    <div>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap component='div'> Editar un Lugar </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEventEdit}> Cancelar </Button>
        </Grid>
        <Box sx={{ m: 1 }}/>
      <Divider />

      <Box sx={{ m: 2 }}/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
           <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Nombre del Lugar" name="lugar" value={lugar} onChange={ (e) => setLugar(  e.target.value ) } />         
        </Grid>
        <Grid item xs={4}>
        <TextField id="outlined-basic" select variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Estado" name="estado" value={estado}  onChange={ (e) => setEstado( e.target.value) }>  
        {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}</TextField>
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" inputProps={{ type: 'number', }} variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }}label="Latitud" name="lat" value={lat} onChange={ (e) => setLat( e.target.value) } />
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" inputProps={{ type: 'number', }} variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Longitud" name="lng" value={lng} onChange={ (e) => setLng( e.target.value) } />
        </Grid>
        <Grid item xs={8}>
        <IconButton color="primary" onClick={ handleAdd } aria-label="upload picture" component="label">
       <AddIcon />
        </IconButton>
         <TextField disabled id="outlined-start-adornment" label="Radio" name="radio" value={radio} size="small" sx={{ width: 500, maxWidth: '30%', }} InputProps={{ endAdornment: <InputAdornment position="start">m</InputAdornment> }} onChange={ (e) => setRadio( e.target.value) } />
         <IconButton color="error" onClick={ disaggregate } aria-label="upload picture" component="label">
        <RemoveIcon />
        </IconButton>
        <TextField disabled id="outlined-basic" label="Rango" name="rango" value={rango} size="small" sx={{ width: 500, maxWidth: '40%', }} onChange={ (e) => setRango( e.target.value) } />
        </Grid>
        <Grid item xs={4}>
        <TextField id="outlined-basic" inputProps={{ type: 'text', pattern:'[A-Za-z0-9]+@[a-z]+\.[a-z]+' }} variant="outlined"  size="small" sx={{ width: 500, maxWidth: '100%', }} label="Tipo de Tarea" value={tipo} onChange={ (e) => setTipo( e.target.value) }/>
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} multiline minRows={2} label="Referencia" value={referencia} onChange={ (e) => setReferencia( e.target.value) } />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ m: 2 }}/>
    <Divider />
 <Box m={1} display="flex" justifyContent="center" alignItems="center">
   <Button  variant="outlined" size="medium" sx={{ height: 40 }} onClick={ onSavePlace }>  Guardar </Button>
 </Box>
    </div>

  
  )
}
