import { collection } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const getPlacesByName = ( name = '' ) => {
    name = name.toLocaleLowerCase().trim();

    if ( name.length === 0 ) return [];
    const collectionRef = collection(FirebaseDB, "points");

  return points.filter(
    point => point.lugar.toLocaleLowerCase().includes( name ) 
  )
}


export default async function getAllPlaces() {
    const points = [];
    const collectionRef = collection(FirebaseDB, "points");
    const snapshot = await getDocs(collectionRef);
    snapshot.forEach((doc) => {
      points.push( { ...doc.data(),  id: doc.id  });
    });
    return points;
  }