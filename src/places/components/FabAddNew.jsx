import { Button, Divider, Grid, MenuItem, TextField, Typography, Box, IconButton, InputAdornment, Stack } from '@mui/material';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { FirebaseDB, FirebaseSto } from '../../firebase/config';
import { useForm } from '../../hooks';

const formData = {
  lugar: '',
  estado: '',
  latitud: '',
  longitud: '',
  radio:'',
  tipo:'',
  referencia:'',
}

const formValidations = {
  
  lugar:  [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  estado:  [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  latitud:  [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  longitud:  [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  radio: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  tipo: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  referencia: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}


export const FabAddNew = ({ closeEvent, actualizarEstadoPlaces }) => {
  
  
  const [url, setUrl] = React.useState("");
  const [rango, setRango] =React.useState("");

      //varible de validador
      const [formSubmitted, setFormSubmitted] = React.useState(false);

      const { formState, lugar, estado, latitud, longitud, radio, tipo, referencia, onInputChange,
            isFormValid, lugarValid, estadoValid, latitudValid,  longitudValid, radioValid, tipoValid, referenciaValid 
            } = useForm( formData, formValidations );

    //Subir Archivo
    const archivoHandler = async ( e ) => {
      const archivo = e.target.files[0];
      
      try {
        const newRef = ref(FirebaseSto, v4()); // nombre del archivo
      await  uploadBytes(newRef, archivo);
      const urlimagen = await getDownloadURL(newRef);
      setUrl(urlimagen)
      console.log(urlimagen)
    } catch (error) {
        alert(error);
    }
    }
    
    //---------------------------Rango---------------------------

    const dentro = 'Dentro del Rango';
    const fuera = 'Fuera del Rango';
    
    ///------------------Botones de menos o más-----------------
    //Botton de más
    const handleAdd = () => { 
      
      if ( radio < 302 )  {
        setRango(dentro);
        }else{
          setRango(fuera);
        }
  } 


  const data = { url:url, estado:estado, lat:Number(latitud), lng:Number(longitud), lugar:lugar, radio:radio, 
                 referencia:referencia, tipo:tipo, rango:rango, timestamp:serverTimestamp() };


//botton
    const onSavePlace = async ( e ) => {
       
        e.preventDefault();
        
        
        setFormSubmitted(true);
       
        
        if ( !isFormValid ) return;
        const placeCollection = collection(FirebaseDB, "points");
        const docRef = doc(placeCollection);
        setDoc(docRef, data, formState);
         actualizarEstadoPlaces();

        
        Swal.fire("Submitted!", "Your file has been submitted", "success");
        closeEvent();
       
    };

    // Datos de combox
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
            <Typography variant='h6' noWrap component='div'> Agregar un Nuevo Lugar </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEvent}> Cancelar </Button>
        </Grid>
        <Box sx={{ m: 1 }}/>
      <Divider />

      <Box sx={{ m: 2 }}/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
           <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Nombre del Lugar" name="lugar" value={lugar} onChange={ onInputChange } error={ !!lugarValid && formSubmitted } helperText={ lugarValid }/>         
        </Grid>
        <Grid item xs={4}>
        <TextField id="outlined-select-currency" select variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Estado" name="estado" value={estado} onChange={ onInputChange } error={ !!estadoValid && formSubmitted } helperText={ estadoValid }>  
        {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}</TextField>
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic"  variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }}label="Latitud" type="decimal"  name="latitud" value={latitud} onChange={ onInputChange } error={ !!latitudValid && formSubmitted }
            helperText={ latitudValid }/>
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} label="Longitud" type="decimal" name="longitud" value={longitud} onChange={ onInputChange } error={ !!longitudValid && formSubmitted }
            helperText={ longitudValid }/>
        </Grid>
        <Grid item xs={7}>
        <Stack direction="row" spacing={2}>
<TextField min="1" id="outlined-start-adornment" label="Radio" name="radio" value={radio} size="small" sx={{ width: 500, maxWidth: '40%' }} InputProps={{ endAdornment: <IconButton color="primary" aria-label="upload picture" onClick={ handleAdd } component="label"> <RadioButtonCheckedIcon />  </IconButton> }} onChange={ onInputChange } error={ !!radioValid && formSubmitted }
          helperText={ radioValid }/>
        <TextField disabled id="outlined-basic" label="Rango" name="rango" value={rango} size="small" sx={{ width: 500, maxWidth: '50%', }} onChange={ onInputChange } />
        
        </Stack>
         
        </Grid>
        <Grid item xs={5}>
        <TextField id="outlined-basic" inputProps={{ type: 'text', pattern:'[A-Za-z0-9]+@[a-z]+\.[a-z]+' }} variant="outlined"  size="small" sx={{ width: 500, maxWidth: '100%', }} label="Tipo de Tarea" name="tipo" value={tipo} onChange={ onInputChange } error={ !!tipoValid && formSubmitted }
           helperText={ tipoValid } />
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: 500, maxWidth: '100%', }} multiline minRows={2} label="Referencia" name="referencia" value={referencia} onChange={ onInputChange } error={ !!referenciaValid && formSubmitted } helperText={ referenciaValid }/>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ m: 2 }}/>
    
        <input accept="image/*" type="file" onChange={ archivoHandler } />
    <Box sx={{ m: 2 }}/>
    <Divider />
 <Box m={1} display="flex" justifyContent="center" alignItems="center">
   <Button  variant="outlined" size="medium" sx={{ height: 40 }} onClick={ onSavePlace }>  Guardar </Button>
 </Box>
    </div>

  
  )
}
