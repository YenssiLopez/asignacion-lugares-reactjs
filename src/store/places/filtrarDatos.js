import { FirebaseDB } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore/lite";



export default async function filtrarDatos( stringBusqueda ) {
    const docusFiltrado = [];

    const collectionRef = collection(FirebaseDB, "points");
    
    const queryLugar = query(collectionRef, where("lugar", "==", stringBusqueda) );
    const queryEstado = query(collectionRef, where("estado", "==", stringBusqueda));
    const queryRadio = query(collectionRef, where("radio", "==", stringBusqueda));
    const queryLongitud = query(collectionRef, where("longitud", "==", stringBusqueda));
    const queryLatitud = query(collectionRef, where("latitud", "==", stringBusqueda));
    const queryTipo = query(collectionRef, where("tipo", "==", stringBusqueda));
    const queryReferencia = query(collectionRef, where("referencia", "==", stringBusqueda));
    const queryRango = query(collectionRef, where("rango", "==", stringBusqueda));


    //const snapshotLugar = await getDocs(queryLugar);
   /// const snapshotEstado = await getDocs(queryEstado);

  const arraySnapshots= await Promise.all([ getDocs(queryLugar), getDocs(queryEstado), getDocs(queryRadio), 
                                            getDocs(queryLongitud), getDocs(queryLatitud), getDocs(queryTipo),
                                            getDocs(queryReferencia), getDocs(queryRango)  ]);


  arraySnapshots.forEach((snapshot) => {
    snapshot.forEach((doc) => {
      docusFiltrado.push( { ...doc.data(), id: doc.id  } );
    });
  });



//  console.log(docusFiltrado)
   return docusFiltrado;
   
  }