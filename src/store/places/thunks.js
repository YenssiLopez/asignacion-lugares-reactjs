import { addDoc, collection, deleteDoc, doc, setDoc, getDoc, updateDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyPlace, setActivePlace } from '.';
import { deletePlaceById, savingNewPlace, setPlaces,  setSaving, updatePlace } from './pointsSlice';
import { loadPlaces } from '../../helpers';



export const startNewPlace = (infoPlace) => {
    return async( dispatch ) => {

        dispatch( savingNewPlace() );


     
        const docRef = await addDoc(collection(FirebaseDB, "points"), infoPlace );
      //  console.log("Document written with ID: ", docRef.id);


        dispatch( addNewEmptyPlace( infoPlace ) );
        dispatch( setActivePlace( infoPlace ) );


    }
}



export const startLoadingPlaces = () => {
  return async( dispatch, getState ) => {
      
      const { uid } = getState().auth;

      const places = await loadPlaces( uid );
      dispatch( setPlaces( places ) );
  }
}


export const startSavePlace = (formData, rowData) => {
  return async( dispatch, getState ) => {

      dispatch( setSaving() );
  
    //  const docRef = doc(FirebaseDB, "points", formData.id );
    //  await getDocs( docRef, formData );
   // const { active:point } = getState().points;

      const collectionRef = doc(FirebaseDB, "points", formData.id);


      await updateDoc( collectionRef, formData);

    //  dispatch( updatePlace( point ) );

  }
}





//export default async function startDeletingPlace( point ) {
//    const coleccionRef = collection(FirebaseDB, "points");
//    const docuRef = doc(coleccionRef, point.id);
//    const eliminado = await deleteDoc(docuRef);
  
  
//    return eliminado;

//}


