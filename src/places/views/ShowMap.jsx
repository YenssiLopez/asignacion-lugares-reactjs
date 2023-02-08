import React, { useState, useEffect } from 'react'
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import { FabMap } from '../components';
import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

const containerStyle = {
  width: '1210px',
  height: '550px'
};


export const ShowMap = () => {
  //----------------obtener los datos de firebase----------------------
  const [points, setPoints] = useState([]);
  
  const actualizarEstadoPlaces = async () => {
    const collectionRef = collection(FirebaseDB, "points");
    const data = await getDocs(collectionRef);
    setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    actualizarEstadoPlaces();
  }, []);
//-------------------------Modales---------------------------------------

//----------------------Modal de Agregar---------------------------------
const [openMap, setOpenMap] = React.useState(false);
const handleOpen = () => setOpenMap(true);
const handleClose = () => setOpenMap(false);
const [fullWidth] = React.useState(true);
const [maxWidth] = React.useState('xl');




//--------------------------------------------------------------------------------------------------------------------
//-----------------------------Configuración de del mapa--------------------------------------------------------------

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
}

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA9X7_abzjoL72GbnuF5k4EUQiabtIN9mY"
  });

  function createKey(point) {
    return point.lat + point.lng
  }


  return (
    
    <div>
      <Box sx={{ m: 2 }}/>
<Typography variant="body2" color="text.secondary"> 
        Mapa de lugares que están registrado o registrar un nuevo Lugar
        </Typography>
        <Box sx={{ m: 3 }}/>

        <div className='map'>
        { isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
			  center={ { lat: 14.107142, lng: -87.201325 } } 
        zoom={10}
      >
        

        <MarkerClusterer options={options}>
        {(clusterer) =>
            points.map((point) => (
              <Marker key={createKey(point)} position={point} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>
        <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'absolute',
          right: 40,
          bottom: 40
        }}
        onClick={handleOpen}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
        
       <></>
      </GoogleMap>
  ) : <></>
   }
 </div>
  {/* Modal de ingresar */}
  <Dialog
        open={openMap}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FabMap closeEventMap={handleClose} actualizarEstadoPlaces={actualizarEstadoPlaces} />
      </Dialog>
 
 
    </div>
  )
}
