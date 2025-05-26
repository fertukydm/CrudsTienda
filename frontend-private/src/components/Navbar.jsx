
 import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Botón hamburguesa */}
        <div className="menu-button-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/34.34.png" alt="Menú" className="navbar-menu-icon" />
          </button>
        </div>

        {/* Logo */}
        <div className="navbar-logo">
          OK RECORDS 
        </div>

        {/* Íconos */}
        <div className="navbar-icons">
          <button>
            <img src="/31.31.png" alt="Buscar" className="navbar-icon" />
          </button>
          <button>
            <img src="/33.33.png" alt="Carrito" className="navbar-icon" />
          </button>
          <button className="desktop-only">
            <img src="/32.32.png" alt="Usuario" className="navbar-icon" />
          </button>
        </div>
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/login" className="menu-link" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li className="menu-item">
              <Link to="" className="menu-link" onClick={() => setMenuOpen(false)}>
               Home
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/carrito" className="menu-link" onClick={() => setMenuOpen(false)}>
                Carrito 
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/metodop" className="menu-link" onClick={() => setMenuOpen(false)}>
                Metodo de pago
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
