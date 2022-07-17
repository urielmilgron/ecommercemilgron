import './Navbar.css'
import CarWidget from '../CarWidget/CarWidget';
const Navbar = () => {
return(
    <nav className="Navbar">
        <div className="NombreTienda">
            <h4>SyM Caleta</h4>
        </div>
        <div className="Categorias">
            <button className="ButtonsCategory">Home</button>
            <button className="ButtonsCategory">Productos</button>
            <button className="ButtonsCategory">Combos</button>
            <button className="ButtonsCategory">Contacto</button>
        </div>
        <CarWidget/>
    </nav>
)
}
export default Navbar;