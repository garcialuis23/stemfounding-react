import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = 2; // Reemplaza con el ID del usuario actual
  const username = "Luis";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm px-3 mt-3">
      <div className="container-fluid">
        {/* Logo o enlace de Proyectos a la izquierda */}
        <Link to="/" className="navbar-brand fw-semibold">
          Projects
        </Link>

        {/* Perfil con menú desplegable a la derecha */}
        <div className="ms-auto position-relative">
          <button
            className="btn btn-light border d-flex align-items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {username} <FaChevronDown className="ms-1" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="position-absolute end-0 mt-2 w-100 bg-white border rounded shadow">
              <Link to={`/users/${userId}`} className="dropdown-item">
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
