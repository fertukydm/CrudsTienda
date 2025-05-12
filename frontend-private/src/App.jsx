import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login"; 
import Home from "./pages/Home"; 
import Carrito from "./pages/Carrito";
import Metododepago from "./pages/Pago";
import Recuperar1 from "./pages/RecuContra";




function App() {
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/metodop" element={<Metododepago />} />
      <Route path="/recuperar" element={<Recuperar1 />} />

    </Routes>
    </>
   
  );
}

export default App;