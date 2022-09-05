import "./Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../Context/CartContext";
import ItemCart from "../ItemCart/ItemCart";

const Cart = () => {
  const { cart, totalPriceProd } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <main className="mainCart">
        <h2 className="titleCart">
          Ops! Parece que no hay elementos en el carro
        </h2>
        <Link to="/" className="linkCart">
          Ir al inicio
        </Link>
      </main>
    );
  }
  return (
    <main className="mainCart">
      <div className="containerMainCart">
        <div className="divCartitle">
          <h2 className="titleCart">Carrito de compras</h2>
        </div>
        {cart.map((product) => (
          <ItemCart key={product.id} product={product}></ItemCart>
        ))}{" "}
        <p className="titleCart finalPrice">
          Precio total: ${totalPriceProd()}
        </p>
        <Link className="link" to="/checkout">
          Finalizar compra
        </Link>
      </div>
    </main>
  );
};

export default Cart;
