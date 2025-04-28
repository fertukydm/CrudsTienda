import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Nav from './components/Nav'; 
import Contact from './pages/contact'; 
import Policy from './pages/policy'; 
import Login from "./pages/login";
import CrearCuenta from './pages/CrearCuenta';
import Carrito from './pages/Carrito';
import ProcesoPago from './pages/ProcesodePago';



function App() {
  return (
    <>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/politica" element={<Policy/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/CrearCuenta" element={<CrearCuenta/>} />
        <Route path="/ProcesoPago" element={<ProcesoPago/>} />
        <Route path="/Carrito" element={<Carrito/>} />
      </Routes>
    </>
  );cd
}

export default App;
