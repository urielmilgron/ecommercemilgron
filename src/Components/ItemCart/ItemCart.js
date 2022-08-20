import './ItemCart.css'
import { useContext } from "react"
import CartContext from "../Context/CartContext"

const ItemCart = ({ product }) => {
    const { remove } = useContext(CartContext)

    return (
        <div className="ItemCart">
            <div className='ItemsCenter'>
            <img className="ItemImg" src={product.img} alt={product.title} />
            <div className='ItemInfo'>
            <p>Producto: {product.name}</p>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio: {product.price}</p>
            <p>Subtotal: {product.quantity * product.price}</p>
            <button className='ItemButton' onClick={()=> remove(product.id)}>Eliminar</button>
            </div>
            </div>
        </div>
    )
}
export default ItemCart