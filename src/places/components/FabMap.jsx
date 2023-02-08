import React from 'react'
import { Box, Button, DialogContent, DialogTitle, Divider, FormHelperText, Grid, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, NativeSelect, Stack, Typography } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useForm } from '../../hooks';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { FirebaseDB, FirebaseSto } from '../../firebase/config';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

  const containerStyle = { width:  '600px', height: '300px' };

  const center = { lat: 14.107142, lng: -87.201325 }


  const formData = { lugar: '', estado: '', latitud: '', longitud: '', radio:'', tipo:'', }
    
  const formValidations = {
    lugar:  [ (value) => value.length >= 5, 'El nombre es obligatorio.'], estado:  [ (value) => value.length >= 3, 'El nombre es obligatorio.'], 
    radio: [ (value) => value.length >= 1, 'El nombre es obligatorio.'], tipo: [ (value) => value.length >= 3, 'El nombre es obligatorio.'],
    
    }

export const FabMap = ({ closeEventMap, actualizarEstadoPlaces }) => {
  //Coordenada
  const [latitud, setLatitud] =React.useState(14.107142);
  const [longitud, setLongitud] =React.useState(-87.201325);

  const [url, setUrl] = React.useState("");
  const [rango, setRango] =React.useState("");
  // Referencia
  const [referencia, setReferencia ] = React.useState('');
  const [newreferencia, setNewReferencia ] = React.useState([]);


  

  const { isLoaded } = useJsApiLoader({  id: 'google-map-script', googleMapsApiKey: "AIzaSyA9X7_abzjoL72GbnuF5k4EUQiabtIN9mY" });

  
  const handleMapClick = (e) => { 
      setLatitud( e.latLng.lat() )
    setLongitud( e.latLng.lng() )
   }
  
  
  
  function createKey(latitud, longitud) { return  [ latitud, longitud ] }

  //varible de validador
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const { formState, lugar, estado, radio, tipo, onInputChange, isFormValid, lugarValid, estadoValid, 
          radioValid, tipoValid } = useForm( formData, formValidations );

    //Subir Archivo
    const archivoHandler = async ( e ) => {
      const archivo = e.target.files[0];
      
      try {
        const newRef = ref(FirebaseSto, v4()); // nombre del archivo
      await  uploadBytes(newRef, archivo);
      const urlimagen = await getDownloadURL(newRef);
      setUrl(urlimagen)
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
  //Agregar una nueva referencia
  const listreferencia = () => {

    if (!referencia) {
    
    
    }else {
     setNewReferencia([ ...newreferencia, referencia]);
     setReferencia('');
    
    }
  
  };

  const deletereferencia = (id) => {
  console.log(id)
  
  const updatreferencia = newreferencia.filter((elem, ind) => {
      return ind != id;
  
  });
  
  setNewReferencia(updatreferencia)
  }



  const data = { url:url, estado:estado, lat:Number(latitud), lng:Number(longitud), lugar:lugar, radio:radio, referencia:newreferencia, tipo:tipo, rango:rango, timestamp:serverTimestamp() };

      // Datos de combox
  const currencies = [ { value: ' ', label: ' ', },{ value: 'Disponible', label: 'Disponible', },{ value: 'No Disponible',  label: 'No Disponible', },];

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
        closeEventMap();
       
    };

  return (
    <div>
       <DialogTitle>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant='h6' noWrap component='div'> Agregar un Nuevo Lugar </Typography> 
              <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEventMap}> Cancelar </Button>
          </Grid> 
          <Box sx={{ m: 1 }}/>
        </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ width: '100%' }}>
      
        <Grid container spacing={2}>
          <Grid item xs={6}>
               <Stack direction="row" >
                 <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Nombre del Lugar" name="lugar" value={lugar} onChange={ onInputChange } error={ !!lugarValid && formSubmitted } helperText={ lugarValid } />
                    <NativeSelect label="With normal TextField" id="select" sx={{ width: 500, maxWidth: '100%', m: 1, }}  placeholder="Nombre del Lugar" name="estado" value={estado} onChange={ onInputChange } error={ !!estadoValid && formSubmitted } helperText={ estadoValid } >
                    {currencies.map((option) => (
                       <option key={option.value} value={option.value}>
                       {option.label}
                      </option>
                       ))}
                    </NativeSelect>
               </Stack>
               <Stack direction="row" sx={{ width: '100%' }}>&nbsp;&nbsp;
                 <FormHelperText id="component-helper-text"> { lugarValid } </FormHelperText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <FormHelperText id="component-helper-text"> { estadoValid } </FormHelperText>
               </Stack>
            <Stack direction="row" sx={{ width: '100%' }} >
                 <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Radio" name="radio" value={radio} onChange={ onInputChange } error={ !!radioValid && formSubmitted } helperText={ radioValid }    
                  endAdornment={<InputAdornment position="end"><IconButton color="primary" onClick={ handleAdd }> <RadioButtonCheckedIcon />  </IconButton>  </InputAdornment> } /> 
                 <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Rango" name="rango" value={rango} onChange={ onInputChange }/>
                 <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Tipo de Tarea" name="tipo" value={tipo} onChange={ onInputChange } error={ !!tipoValid && formSubmitted } helperText={ tipoValid } />
            </Stack>
            <Stack direction="row" sx={{ width: '100%' }} >&nbsp;&nbsp;
                 <FormHelperText id="component-helper-text"> { radioValid } </FormHelperText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <FormHelperText id="component-helper-text"> { tipoValid } </FormHelperText>
               </Stack>
               
                 <Grid container spacing={2}>
              <Grid item xs={6}>
              <Box sx={{ '& button': { m: 1 } }}>

<Input id="outlined-basic" variant="outlined" size="small" sx={{ width: 400, maxWidth: '60%',  m: 1}} endAdornment={<IconButton color="primary" aria-label="upload picture" onClick={ listreferencia } component="label">  <AddCircleIcon />  </IconButton> } multiline minRows={2} label="Referencia" name="referencia" value={referencia} onChange={ (e) => setReferencia( e.target.value) } />
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
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" >
               <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Latitud" name="latitud" value={latitud} onChange={ (e) => setLatitud( e.target.value) }  />
               <Input id="component-simple" sx={{ width: 500, maxWidth: '100%', m: 1, }} placeholder="Longitud" name="longitud" value={longitud} />
            </Stack>

       
     
        <div className='map'>
        { isLoaded ? ( 
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onClick={handleMapClick}>
    <input
        type="text"
        placeholder={createKey(latitud, longitud)}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `300px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
                <Marker draggable position={center} onDragStart={handleMapClick} onClick={handleMapClick} />
                
        
                 <></>
              </GoogleMap>
                     ) : <></>
        }
        </div>
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
