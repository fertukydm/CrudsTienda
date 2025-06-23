import { useEffect, useState } from 'react';
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
import Contactmen from "./pages/ContactM";
import { Toaster } from 'react-hot-toast';

function App() {
  const [carrito, setCarrito] = useState(() => {
  const guardado = localStorage.getItem('carrito');
  return guardado ? JSON.parse(guardado) : [];
});


  // Cargar desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    fetch('http://localhost:4001/api/login')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <AuthProvider>
      <>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          {/* Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Home agregarAlCarrito={(producto) => {
              const existente = carrito.find(p => p.id === producto.id);
              if (existente) {
                setCarrito(prev =>
                  prev.map(p =>
                    p.id === producto.id
                      ? { ...p, quantity: p.quantity + 1 }
                      : p
                  )
                );
              } else {
                setCarrito(prev => [...prev, producto]);
              }
            }} />
          } />
          <Route path="/recuperar" element={<Recuperar1 />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/metodop" element={<Metododepago />} />
          <Route path="/agregar-producto" element={<Productos />} />
          <Route path="/contactosMensaje" element={<Contactmen />} />

          {/* Protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/pago" element={<Pago />} />
          </Route>
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
