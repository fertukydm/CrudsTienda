import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Importar el contexto de autenticación
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useAuth(); 

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
        <div className="navbar-logo">OK RECORDS</div>

        {/* Botón de Cerrar Sesión (solo si está autenticado) */}
        {user && (
          <button className="cerrar-sesion" onClick={logOut}>
            Cerrar Sesión
          </button>
        )}
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className={`menu-dropdown ${menuOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/login" className="menu-link" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>
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
                Método de pago
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/contactosMensaje" className="menu-link" onClick={() => setMenuOpen(false)}>
                Mensajes de contactanos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

