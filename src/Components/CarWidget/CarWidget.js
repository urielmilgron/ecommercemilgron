import "./CarWidget.css";
import { useContext } from "react";
import CartContext from "../Context/CartContext";
import { Link } from "react-router-dom";

const CarWidget = () => {
  const { getQuantity } = useContext(CartContext);
  const quantity = getQuantity();
  if (quantity === 0) {
    return (
      <div className="carWidget carWidgetNone">
        <img className="imageCart" alt="carWidget" src="/images/cart.svg" />
        {quantity}
      </div>
    );
  }
  return (
    <Link className="carWidget" to="/cart">
      <img className="imageCart" alt="carWidget" src="/images/cart.svg" />
      {quantity}
    </Link>
  );
};

export default CarWidget;
