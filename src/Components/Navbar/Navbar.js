import './Navbar.css'
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
        <div className="divCarrito">
            <button className="Carrito">Carrito</button>
        </div>
    </nav>
)
}
export default Navbar;