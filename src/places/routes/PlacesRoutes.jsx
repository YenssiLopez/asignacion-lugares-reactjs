import { Navigate, Routes,  Route} from "react-router-dom"
import { PlacesPage, ListPlacesPages, MapPage  } from "../pages"


export const PlacesRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <PlacesPage /> } />

        <Route path="places/list" element={ <ListPlacesPages /> } />

        <Route path="places/map" element={ <MapPage /> } />


        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
