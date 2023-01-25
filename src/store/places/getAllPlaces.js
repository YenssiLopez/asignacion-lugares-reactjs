import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { FirebaseDB } from './../../firebase/config';


export default async function getAllPlaces() {
  const points = [];
  const collectionRef = collection(FirebaseDB, "points");
  const q = query(collectionRef, orderBy("timestamp", "desc"))
  const snapshot = await getDocs( q );
  snapshot.forEach((doc) => {
    points.push( { ...doc.data(), id: doc.id, });
  });
  return points;
}