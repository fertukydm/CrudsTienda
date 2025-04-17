import { useState } from 'react';
import './Nav.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Botón hamburguesa (visible siempre) */}
        <div className="menu-button-container">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/29.png" alt="Menú" className="navbar-menu-icon" />
          </button>
        </div>

        {/* Título/Logo */}
        <div className="navbar-logo">
          OK RECORDS
        </div>

        {/* Íconos de la derecha */}
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
     {/* Menú hamburguesa desplegable */}
{menuOpen && (
  <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
    <ul className="menu-list">
      <li className="menu-item">
        <a href="#" className="menu-link" onClick={() => setMenuOpen(false)}>Crear cuenta</a>
      </li>
      <li className="menu-item">
        <a href="#" className="menu-link" onClick={() => setMenuOpen(false)}>Contactos</a>
      </li>
      <li className="menu-item">
        <a href="#" className="menu-link" onClick={() => setMenuOpen(false)}>Mi cuenta</a>
      </li>
    </ul>
  </div>
)}

    </nav>
  );
};

export default Navbar;
