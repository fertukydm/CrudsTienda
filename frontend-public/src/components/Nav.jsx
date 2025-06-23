import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="menu-button-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/29.png" alt="Menú" className="navbar-menu-icon" />
          </button>
        </div>

        <div className="navbar-logo">
          OK RECORDS
        </div>

        {/* Íconos con navegación */}
        <div className="navbar-icons">
          {/* Buscar: /buscar */}
          <button onClick={() => {
            setMenuOpen(false);
            navigate('/producto');
          }}>
            <img src="/26.png" alt="Buscar" className="navbar-icon" />
          </button>

          {/* Carrito: /carrito */}
          <button onClick={() => {
            setMenuOpen(false);
            navigate('/Carrito');
          }}>
            <img src="/28.png" alt="Carrito" className="navbar-icon" />
          </button>

          {/* Usuario: /mi-cuenta */}
          <button className="desktop-only" onClick={() => {
            setMenuOpen(false);
            navigate('/');
          }}>
            <img src="/27.png" alt="Usuario" className="navbar-icon" />
          </button>
        </div>

        {/* Menú desplegable hamburguesa */}
        {menuOpen && (
          <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/crear-cuenta" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Crear cuenta
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/login" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/contacto" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Contactos
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/politica" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Nuestra política
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/producto" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Productos
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/RegistrarEmpleado" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Registrar Empleado
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/ProcesodePago" className="menu-link" onClick={() => setMenuOpen(false)}>
                  Proceso de Pago
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;