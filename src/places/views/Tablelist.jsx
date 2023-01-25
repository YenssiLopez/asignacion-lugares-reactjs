import React from 'react';
import {  Autocomplete, Box, IconButton, Button, ButtonGroup, Modal, OutlinedInput, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ModalLayout } from '../layout/ModalLayout';
import { FabAddNew, FabEditAdd, FabShow } from '../components';
import { useState } from 'react';
import { useEffect } from 'react';
import FabDelete from '../components/FabDelete';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';


export const Tablelist = () => {

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

//-----------------Paginación de Tabla---------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
//-----------------------------------------------------------------------
//-------------------------Modales---------------------------------------

//----------------------Modal de Agregar---------------------------------
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
//-------------------Capturar información------------------------------
 const [formid, setFormid] =React.useState("");
//----------------------Modal de Editar---------------------------------
const [openEdit, setOpenEdit] = React.useState(false);
const handleOpenEdit = () => setOpenEdit(true);
const handleCloseEdit = () => setOpenEdit(false);
//Capturar la información de tabala
const editData = (id, lugar, estado, lat, lng, radio, tipo, referencia) => {
const data = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo };
setFormid(data);
handleOpenEdit(); 
}

//----------------------Modal de Editar---------------------------------
const [openShow, setOpenShow] = React.useState(false);
const handleOpenShow = () => setOpenShow(true);
const handleCloseShow = () => setOpenShow(false);
//Capturar la información de tabala
const showData = (id, lugar, estado, lat, lng, radio, tipo, referencia) => {
const datashow = { id:id, estado:estado, lat:lat, lng:lng, lugar:lugar, radio:radio, referencia:referencia, tipo:tipo };
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
      Tabla de Lugares
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
        Lista de lugares que están registrado o registrar un nuevo Lugar
        </Typography>
        <Box sx={{ m: 3 }}/>
      


<Button sx={{ right: -15, bottom: 10 }} onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />}>Agregar
      </Button>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
          <TableCell>#</TableCell>
            <TableCell align="center">Lugar</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Latitud y Logitud</TableCell>
            <TableCell align="center">Radio</TableCell>
            <TableCell align="center">Tipo de Lugar</TableCell>
            <TableCell align="center">Acción</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
       
        {points
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((point, index) => (
            <TableRow key={point.id} >
              <TableCell component="th" scope="place">{index + 1} </TableCell>
              <TableCell align="center">{point.lugar} </TableCell>
              <TableCell align="center">{point.estado}</TableCell>
              <TableCell align="center">{point.lat}, {point.lng}</TableCell>
              <TableCell align="center">{point.radio}</TableCell>
              <TableCell align="center">{point.tipo}</TableCell>
              <TableCell>
                  <ButtonGroup>

        
        <IconButton color="edit" aria-label="upload picture" onClick={() => { editData(point.id, point.lugar, 
        point.estado, point.lat, point.lng, point.radio, point.tipo, point.referencia) }} component="label">
        <EditIcon/>
        </IconButton>
        <IconButton color="show" aria-label="upload picture" onClick={() => { showData(point.id, point.lugar, 
        point.estado, point.lat, point.lng, point.radio, point.tipo, point.referencia) }} component="label">
        <VisibilityIcon/>
        </IconButton>
        <IconButton color="error" aria-label="upload picture" onClick={() => { FabDelete(point, actualizarEstadoPlaces) }} component="label">
        <DeleteIcon/>
        </IconButton>
                      
                  </ButtonGroup>
              </TableCell>
            </TableRow>
)) }
        </TableBody>
       </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={points.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


  
    </Box>    
      )}
     {/* Modal de ingresar */}
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...ModalLayout, width: '60%' }}>
        <FabAddNew closeEvent={handleClose} actualizarEstadoPlaces={actualizarEstadoPlaces} />
        </Box>
      </Modal>


      {/* Modal de editar */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...ModalLayout, width: '50%' }}>
        <FabEditAdd closeEventEdit={handleCloseEdit} actualizarEstadoPlaces={actualizarEstadoPlaces} fid={formid} />
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
      </Modal>

    </div>
  );
}