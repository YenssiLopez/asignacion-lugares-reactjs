import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { useState } from 'react';
import Modal from 'react-modal';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-30%, -10%)',
    },
  };

  Modal.setAppElement('#root');

  


export const ModalAgregar = () => {



    const [isOpen, setIsOpen ]= useState(true)

    //Nombrar las variables
    const [formValues, setFormValues] = useState({
        nombre:   '',
        estado:   '',
        latitud:  '',
        longitud: '',
        tipo:     '',
    });

    //Refrescar el formulario
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

/*-------------Select-------------*/
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    function onCloseModal() {
        console.log('cerrar modal');
        setIsOpen( false );
    }

    

      
  return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className="modal1"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 700 }

    >
        
       <Toolbar>

<Typography variant='h6' noWrap component='div'>
  Hola Mundo
</Typography>
</Toolbar>
<Divider />
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <div>

      <Grid container sx={{ mt: 1 }} >
      
        <TextField
          required
          id="outlined-required"
          label="Nombre del Lugar"
          name="nombre"
          value={ formValues.nombre }
          onChange={ onInputChanged }
        />

       <FormControl   required sx={{ m: 1, minWidth: 360 }}>
  <InputLabel id="demo-multiple-name-label">Estado  </InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    onChange={ handleChange }
    name="estado"
    value={ formValues.estado }
  >
    <MenuItem value={10}>Disponible</MenuItem>
    <MenuItem value={20}>No Disponible</MenuItem>
  </Select>
</FormControl>

       <TextField
          required
          id="outlined-required"
          label="Latitud"
          name="latitud"
          value={ formValues.latitud }
          onChange={ onInputChanged }
        />

<TextField
          required
          id="outlined-required"
          label="Longitud"
          name="longitud"
          value={ formValues.longitud }
          onChange={ onInputChanged }
        />
<TextField
          
          id="outlined-required"
          label="Tipo de Lugar"
          name="tipo"
          value={ formValues.tipo }
          onChange={ onInputChanged }
          
        />

        
</Grid>
      </div>


    </Box>

    <Divider />
    <Box
  m={1}
  display="flex"
  justifyContent="center"
  alignItems="center"
>

  <Button  variant="outlined" size="medium" sx={{ height: 40 }} >
          Medium
        </Button>
</Box>
    </Modal>
  )
}
