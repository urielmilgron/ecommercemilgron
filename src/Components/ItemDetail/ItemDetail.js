//ItemDetail determina el formato de la tarjeta.
import "./ItemDetail.css";
import Counter from "../Counter/Counter";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";

const ItemDetail = ({ id, name, price, description, img, stock }) => {
  const [quantity, setQuantity] = useState(0);

  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantity(quantity);
    console.log(`Se agregaron ${quantity} items`);
    //Defino lo que voy a obtener del producto
    const productToAdd = {
      id,
      name,
      price,
      quantity,
      img,
    };

    addItem(productToAdd);
  };
  return (
    <div className="mainDetail">
      <h2 className="titleDetail">{name}</h2>
      <div className="divDetail">
        <div className="detailImg">
          <img className="detailImage" src={img} />
        </div>
        <div className="divDandP">
          <div className="detailDescription">
            <p>{description}</p>
          </div>
          <div className="detailPrice">
            <h3>Precio: ${price}</h3>
          </div>
          <div className="detailFooter">
            {/* Le agrego el contador si está en 0, y si no está en 0, que aparezca el link */}
            {quantity === 0 ? (
              <Counter stock={stock} onAdd={handleOnAdd} />
            ) : (
              <Link className="linkDetail" to="/cart">
                Finalizar Compra
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
//CHECK
