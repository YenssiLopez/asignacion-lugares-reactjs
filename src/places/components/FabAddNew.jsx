import { Button, Divider, Grid, MenuItem, TextField, Typography, Box, IconButton, Stack, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { FirebaseDB, FirebaseSto } from '../../firebase/config';
import { useForm } from '../../hooks';

const formData = { lugar: '', estado: '', latitud: '', longitud: '', radio:'', tipo:'', newreferencia:'' }



export const FabAddNew = ({ closeEvent, actualizarEstadoPlaces }) => {  
//---------------- Referencia
  const [referencia, setReferencia ] = useState('');
  const [newreferencia, setNewReferencia ] = useState([]);
  const [url, setUrl] = useState('');
  const [rango, setRango] =useState('');
//-------------varible de validador
  const [formSubmitted, setFormSubmitted] = useState(false);
const formValidations = {  lugar:  [ (value) => value.length >= 4, 'El lugar es obligatorio.'], estado:  [ (value) => value.length >= 1, 'El estadd es obligatorio.'],
                           latitud:  [ (value) => value.includes ('.'), 'La latitud debe de llevar un punto'], longitud:  [ (value) => value.includes('.'), 'La longitud debe de llevar un punto.'],
                            radio: [ (value) => value.length >= 1, 'El radio es obligatorio.'], tipo: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
                          }

    
  const { formState, lugar, estado, latitud, longitud, radio, tipo, onInputChange, isFormValid, lugarValid, estadoValid, latitudValid, 
         longitudValid, radioValid, tipoValid } = useForm( formData, formValidations );


//-------------Subir Archivo
   const archivoHandler = async ( e ) => {
   const archivo = e.target.files[0];
     
     try { const newRef = ref(FirebaseSto, v4()); // nombre del archivo
     await  uploadBytes(newRef, archivo);
     const urlimagen = await getDownloadURL(newRef);
     setUrl(urlimagen)
     console.log(urlimagen)
   } catch (error) { alert(error);  }
   }
    
//---------------------------Rango---------------------------
  const dentro = 'Dentro del Rango';
  const fuera = 'Fuera del Rango';
        
///------------------Botones de menos o más-----------------
//Botton de más
  const handleAdd = () => { 
    if ( radio < 302 )  { setRango(dentro); }else{ setRango(fuera); }
   } 
    
//--------------Agregar una nueva referencia
  const listreferencia = () => {

    if (!referencia) {  }else {
     setNewReferencia([ ...newreferencia, referencia]);
     setReferencia('');
    }
  };

  //--------Eliminar de la lista
  const deletereferencia = (id) => {
  
  const updatreferencia = newreferencia.filter((elem, ind) => {
      return ind != id;
  });
  setNewReferencia(updatreferencia)
  }

  //-----------------------Información de  que se envia a firebases
  const data = { url:url, estado:estado, lat:Number(latitud), lng:Number(longitud), lugar:lugar, radio:radio, referencia:newreferencia, tipo:tipo, rango:rango, timestamp:serverTimestamp() };
    
    //.................Botton de guardado
  const onSavePlace = async ( e ) => {
   
    e.preventDefault();
    
    setFormSubmitted(true);


    if ( !isFormValid ) return;
    const placeCollection = collection(FirebaseDB, "points");
    const docRef = doc(placeCollection);
    setDoc(docRef, data, formState);
    
    Swal.fire("Submitted!", "Your file has been submitted", "success");
     actualizarEstadoPlaces();
    closeEvent();  
};
    
        // Datos de combox
        const currencies = [ {  value: 'Disponible', label: 'Disponible' }, { value: 'No Disponible', label: 'No Disponible', }, ];

  return (
    <div>
       <DialogTitle>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' noWrap component='div'> Agregar un Nuevo Lugar </Typography> 

              <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEvent}> Cancelar </Button>          </Grid> 
        </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ width: '100%' }}>
      
               <Stack direction="row" >
               <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', m: 1, }} label="Nombre del Lugar" name="lugar" value={lugar} onChange={ onInputChange } error={ !!lugarValid && formSubmitted } helperText={ lugarValid }/>         
        <TextField id="outlined-select-currency" select variant="outlined" size="small" sx={{ width: 500, maxWidth: '40%', m: 1, }} label="Estado" name="estado" value={estado} onChange={ onInputChange } error={ !!estadoValid && formSubmitted } helperText={ estadoValid }>  
                {currencies.map((option) => (  <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}</TextField>
               </Stack>
               <Stack direction="row" >

<TextField id="outlined-basic"  variant="outlined" size="small" sx={{ width: 500, maxWidth: '50%', m: 1, }}label="Latitud" type="decimal"  name="latitud" value={latitud} onChange={ onInputChange } error={ !!latitudValid && formSubmitted }
    helperText={ latitudValid }/>

<TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '50%', m: 1, }} label="Longitud" type="decimal" name="longitud" value={longitud} onChange={ onInputChange } error={ !!longitudValid && formSubmitted }
    helperText={ longitudValid }/>
     </Stack>

     <Stack direction="row" > 
        
        <TextField min="1" id="outlined-start-adornment" label="Radio" name="radio" value={radio} size="small" sx={{ width: 500, maxWidth: '20%', m: 1, }} InputProps={{ endAdornment: <IconButton color="primary" aria-label="upload picture" onClick={ handleAdd } component="label"> <RadioButtonCheckedIcon />  </IconButton> }} onChange={ onInputChange } error={ !!radioValid && formSubmitted }
                  helperText={ radioValid }/>
                <TextField disabled id="outlined-basic" label="Rango" name="rango" value={rango}  size="small" sx={{ width: 500, maxWidth: '30%', m: 1, }} onChange={ onInputChange } />
                <TextField id="outlined-basic" inputProps={{ type: 'text', pattern:'[A-Za-z0-9]+@[a-z]+\.[a-z]+' }} variant="outlined"  size="small" sx={{ width: 500, maxWidth: '45%', m: 1}} label="Tipo de Tarea" name="tipo" value={tipo} onChange={ onInputChange } error={ !!tipoValid && formSubmitted }
                   helperText={ tipoValid } />
              </Stack>
              <Grid container spacing={2}>
              <Grid item xs={6}>
              <Box sx={{ '& button': { m: 1 } }}>

<TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 400, maxWidth: '60%',  m: 1}} InputProps={{ endAdornment: <IconButton color="primary" aria-label="upload picture" onClick={ listreferencia } component="label">  <AddCircleIcon />  </IconButton> }} multiline minRows={2} label="Referencia" name="referencia" value={referencia} onChange={ (e) => setReferencia( e.target.value) } />
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
{newreferencia.map((elem, ind) => {
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
                 <input accept="image/*" type="file" onChange={ archivoHandler } />
                 </Grid>
  
          </Grid>
          </Box>
   </DialogContent>
   <Divider />
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
   <Button  variant="outlined" size="medium" sx={{ height: 40 }} onClick={ onSavePlace } >  Guardar </Button>
 </Box>
 
    </div>

  )
}
