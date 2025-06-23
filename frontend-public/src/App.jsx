import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Agregar Toaster
import Home from './pages/home';
import Nav from './components/Nav'; 
import Contact from './pages/contact'; 
import Policy from './pages/policy'; 
import Login from "./pages/login";
import CrearCuenta from './pages/CrearCuenta';
import RegistrarEmpleado from './pages/RegistrarEmpleado';
import Product from "./pages/Products";
import Review from "./pages/Reviews";
import Carrito from './pages/Carrito';
import ProcesoPago from './pages/ProcesodePago';

function App() {
  

  return (
    <>
      <Toaster position="top-right" /> 
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/politica" element={<Policy/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/crear-cuenta" element={<CrearCuenta/>} />
        <Route path="/ProcesodePago" element={<ProcesoPago/>} />
        <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado />} />
        <Route path="/producto" element={<Product />} />
        <Route path="/Carrito" element={<Carrito/>} />
        <Route path="/Review/:id" element={<Review/>} /> 
      </Routes>
    </>
  );
}

export default App;