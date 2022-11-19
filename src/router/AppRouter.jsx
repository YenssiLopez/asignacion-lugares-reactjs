import { Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { PlacesRoutes } from '../places/routes/PlacesRoutes';


export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp */}
        <Route path="/*" element={ <PlacesRoutes /> } />

    </Routes>
  )
}
