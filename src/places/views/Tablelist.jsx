import React from 'react'
import MUIDataTable from "mui-datatables";

const columns = [
  {
   name: "n",
   label: "N°",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "lugar",
   label: "Lugar",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "estado",
   label: "Estado",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "radio",
   label: "Radio",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
    name: "tipo_de_lugar",
    label: "Tipo de Lugar",
    options: {
     filter: true,
     sort: false,
    }
   },
   {
    name: "accion",
    label: "Acción",
    options: {
     filter: true,
     sort: false,
    }
   },
 ];
 
 const data = [
  { n: "1", lugar: "Test Corp", estado: "Yonkers",  radio: "12",  tipo_de_lugar: "Restaurante", accion: "22222"  },
  { n: "2", lugar: "Test Corp", estado: "Hartford", radio: "12",  tipo_de_lugar: "Restaurante", accion: "22222"  },
  { n: "3", lugar: "Test Corp", estado: "Tampa",    radio: "12",  tipo_de_lugar: "Restaurante", accion: "22222"  },
  { n: "4", lugar: "Test Corp", estado: "Dallas",   radio: "12",  tipo_de_lugar: "Restaurante", accion: "22222"  },
 ];
 
 
 const options = {
   selectableRows: false,
  print: false,
  download: false,
  "order": [[ 0, "desc" ]],/// ordenar los datos desendente
  search: true,


  textLabels: {
  filter: {
    all: "Todos",
    title: "FILTROS",
    reset: "REINICIAR",
  },

  body: {
    noMatch: "Lo sentimos, no se encontraron registros coincidentes",
    toolTip: "Sort",
    columnHeaderTooltip: column => `Sort for ${column.label}`
  },

  pagination: {
    next: "Siguiente página",
    previous: "Pagina anterior",
    rowsPerPage: "Filas por página:",
    displayRows: "de",
  },
  
selectableRowsHeader: true,
  sortFilterList: true,
  viewColumns: {
    title: "Mostrar columnas",
    titleAria: "Mostrar/ocultar columnas de la tabla",
  },
 }


  
};

export const Tablelist = () => {
  return (
    <MUIDataTable
  title={"Employee List"}
  data={data}
  columns={columns}
  options={options}
  actions={[

    {
    icon: 'edit' 
    }
  
  ]}
  
/>
  )
}
