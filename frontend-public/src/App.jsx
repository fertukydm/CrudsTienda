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
// Importar las dependencias
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Solo permite solicitudes desde localhost:3000
}));

// Middleware para parsear JSON (si lo necesitas)
app.use(express.json());

// Rutas de la API
app.post('/api/registerEmployee', (req, res) => {
  // Tu lógica para registrar empleados
});

// Otros middlewares y rutas...

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});


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
