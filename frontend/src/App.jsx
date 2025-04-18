import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Nav from './components/Nav'; 
import Contact from './pages/contact'; 

function App() {
  return (
    <>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
