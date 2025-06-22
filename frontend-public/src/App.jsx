import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home';
import Nav from './components/Nav'; 
import Contact from './pages/contact'; 
import Policy from './pages/policy'; 
import Login from "./pages/login";
import CrearCuenta from './pages/CrearCuenta';
import RegistrarEmpleado from './pages/RegistrarEmpleado';

import Carrito from './pages/Carrito';
import ProcesoPago from './pages/ProcesodePago';



function App() {
  useEffect(() => {
  fetch('http://localhost:3000/api/login')
  fetch('http://localhost:3000/api/registerEmployee')
    .then(res => res.json())
    .then(data => console.log(data));
}, []);

  return (
    <>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/politica" element={<Policy/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/crear-cuenta" element={<CrearCuenta/>} />
        <Route path="/ProcesodePago" element={<ProcesoPago/>} />
       <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado />} />
        <Route path="/Carrito" element={<Carrito/>} />
      </Routes>
    </>
  );
}

export default App;
