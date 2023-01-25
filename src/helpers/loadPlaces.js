import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const loadPlaces = async() => {

    const collectionRef = collection( FirebaseDB, "points"  );
    const docs = await getDocs(collectionRef);

    const points = [];
    docs.forEach( doc => {
        points.push({ id: doc.id, ...doc.data() });
    });
    
    return points;
}
