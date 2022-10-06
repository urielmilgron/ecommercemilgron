import "./Navbar.css";
import CarWidget from "../CarWidget/CarWidget";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="NombreTienda">
        <h4>SYM Caleta</h4>
      </div>
      <div className="Categorias">
        <Link to="/" className="ButtonsCategory">
          HOME
        </Link>
        <Link to="/category/mesas" className="ButtonsCategory">
          MESAS
        </Link>
        <Link to="/category/sillas" className="ButtonsCategory">
          SILLAS
        </Link>
        <Link to="/category/exterior" className="ButtonsCategory">
          EXTERIOR
        </Link>
      </div>
      <CarWidget />
    </nav>
  );
};
export default Navbar;
