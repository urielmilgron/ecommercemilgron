import "./Navbar.css";
import CarWidget from "../CarWidget/CarWidget";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="NombreTienda">
        <h4>SyM Caleta</h4>
      </div>
      <div className="Categorias">
        <Link to="/" className="ButtonsCategory">
          Home
        </Link>
        <Link to="/category/mesas" className="ButtonsCategory">
          Mesas
        </Link>
        <Link to="/category/sillas" className="ButtonsCategory">
          Sillas
        </Link>
        <Link to="/category/exterior" className="ButtonsCategory">
          Exterior
        </Link>
      </div>
      <CarWidget />
    </nav>
  );
};
export default Navbar;
