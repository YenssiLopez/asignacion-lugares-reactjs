import { Navigate, Routes,  Route} from "react-router-dom"
import { PlacesPage, ListPlacesPages, MapPage, CardPages, SearchPages} from "../pages"


export const PlacesRoutes = () => {



  return (


    <Routes>
        <Route path="/" element={ <PlacesPage /> } />

        <Route path="places/list" element={ <ListPlacesPages /> } />

        <Route path="places/map" element={ <MapPage /> } />

        <Route path="places/card" element={ <CardPages /> } />

        <Route path="places/search" element={ <SearchPages /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
