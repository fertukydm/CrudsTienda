import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login"; 
import Home from "./pages/Home"; 
import Carrito from "./pages/Carrito";
import Metododepago from "./pages/Pago";
import Recuperar1 from "./pages/RecuContra";
import Pago from "./pages/Pago";
import Productos from "./pages/Producto";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  useEffect(() => {
  fetch('http://localhost:4001/api/login')
    .then(res => res.json())
    .then(data => console.log(data));
}, []);

  return (
      <AuthProvider>
        <>
          <Navbar />
          <Routes>
            {/* Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
           
            <Route path="/recuperar" element={<Recuperar1 />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/agregar-producto" element={<Productos />} />
           
            {/* Protegidas */}
            <Route element={<PrivateRoute />}>

              <Route path="/pago" element={<Pago />} />
             
              <Route path="/metodop" element={<Metododepago />} />
             
            </Route>
          </Routes>
        </>
      </AuthProvider>
    );
  }

export default App;