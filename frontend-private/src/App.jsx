import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Review from "./pages/ReviewA";
 
function App() {
  // ✅ Estado del carrito con persistencia en localStorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  // ✅ Efecto para guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // ✅ Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
      setCarrito(carrito.map(item => 
        item.id === producto.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, quantity: 1 }]);
    }
  };

  return (
    <AuthProvider>
      <>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/recuperar" element={<Recuperar1 />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/metodop" element={<Metododepago />} />
          <Route path="/agregar-producto" element={<Productos />} />
          <Route path="/contactosMensaje" element={<Contactmen />} />
          <Route path="/Review" element={<Review />} />
          
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/pago" element={<Pago />} />
          </Route>
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;