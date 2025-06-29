import React from 'react'; 
import { Navigate, Outlet } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 

const PrivateRoute = () => {
    const { isLoggedIn } = useAuth(); 

    return isLoggedIn ? <Outlet/> : <Navigate to="/login" />; //  Cambio: redirigir a /login
}

export default PrivateRoute;