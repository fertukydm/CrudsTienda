import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Menu de navegacion por iconos que aun no esta conetado y menu hambuergue */

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
                Nuestra politica
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/mi-cuenta" className="menu-link" onClick={() => setMenuOpen(false)}>
                Mi cuenta
              </Link>
              <li className="menu-item">
              <Link to="/carrito" className="menu-link" onClick={() => setMenuOpen(false)}>
                Carrito
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/ProcesodePago" className="menu-link" onClick={() => setMenuOpen(false)}>
                Proceso de Pago
              </Link>
            </li>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

