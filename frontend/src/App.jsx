import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Nav from './components/Nav'; 
import Contact from './pages/contact'; 
import Policy from './pages/policy'; 
import Login from "./pages/login"



function App() {
  return (
    <>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/politica" element={<Policy/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );cd
}

export default App;
