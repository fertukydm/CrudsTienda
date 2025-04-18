import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Botón hamburguesa */}
        <div className="menu-button-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/29.png" alt="Menú" className="navbar-menu-icon" />
          </button>
        </div>

        {/* Título/Logo */}
        <div className="navbar-logo">
          OK RECORDS
        </div>

        {/* Íconos a la derecha */}
        <div className="navbar-icons">
          <button>
            <img src="/26.png" alt="Buscar" className="navbar-icon" />
          </button>
          <button>
            <img src="/28.png" alt="Carrito" className="navbar-icon" />
          </button>
          <button className="desktop-only">
            <img src="/27.png" alt="Usuario" className="navbar-icon" />
          </button>
        </div>
      </div>

      {/* Menú hamburguesa desplegable */}
      {menuOpen && (
        <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/crear-cuenta" className="menu-link" onClick={() => setMenuOpen(false)}>
                Crear cuenta
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
                Nuestra politica
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/mi-cuenta" className="menu-link" onClick={() => setMenuOpen(false)}>
                Mi cuenta
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

