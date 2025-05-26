import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login"; 
import Home from "./pages/Home"; 
import Carrito from "./pages/Carrito";
import Metododepago from "./pages/Pago";
import Recuperar1 from "./pages/RecuContra";


useEffect(() => {
  fetch('http://localhost:3000/api/login')
    .then(res => res.json())
    .then(data => console.log(data));
}, []);


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