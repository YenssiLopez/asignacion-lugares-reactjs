import { collection, deleteDoc, doc } from "firebase/firestore/lite";
import Swal from "sweetalert2";
import { FirebaseDB } from "../../firebase/config";

export default function FabDelete(point, actualizarEstadoPlaces) {
 Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      deleteApi(point,actualizarEstadoPlaces);
    }
  });

  const deleteApi = async (point, actualizarEstadoPlaces) => {
    const coleccionRef = collection(FirebaseDB, "points");
    const docuRef = doc(coleccionRef, point.id);
    const eliminado = await deleteDoc(docuRef);
    actualizarEstadoPlaces();
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
  };

}

