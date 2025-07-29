import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../App.css";

const Footer = () => {
  return (
    <footer className="text-white py-4 mt-auto w-100" style={{ backgroundColor: "#9b9b9b" }}>
      <div className="container px-3">
        {/* Sección superior */}
        <div className="row text-center border-bottom pb-3 mb-3">
          <div className="col-md-4">
            <span>Email: contacto@stemgranada.com</span>
          </div>
          <div className="col-md-4">
            <span>Teléfono: +34 641 200 411</span>
          </div>
          <div className="col-md-4">
            <span>Dirección: Avenida de Cádiz, 35 Granada, Andalucía 18007</span>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="row text-center align-items-center">
          <div className="col-md-4">
            <img src="/logo.png" alt="Logo de STEM Granada" className="img-fluid" style={{ height: "50px" }} />
          </div>
          <div className="col-md-4">
            <a href="https://stemgranada.com/" className="text-white text-decoration-none">STEM Granada</a>
          </div>
          <div className="col-md-4 d-flex justify-content-center gap-3">
            <a href="https://www.facebook.com/STEMgranada" className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px" }}>
              <FaFacebook />
            </a>
            <a href="https://x.com/STEMgranada" className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px" }}>
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/stemgranada/" className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px" }}>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
