import "./CarWidget.css";
import { useContext } from "react";
import CartContext from "../Context/CartContext";

const CarWidget = () => {
  const { getQuantity } = useContext(CartContext)
  const quantity = getQuantity()
  return (
    <div className="carWidget">
      <img className="imageCart" alt="carWidget" src="/images/cart.svg" />{quantity}
    </div>
  );
};

export default CarWidget;
