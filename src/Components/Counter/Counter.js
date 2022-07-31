import "./Counter.css";
import { useState } from "react";

const Counter = ({stock, onAdd}) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className='CountainCounter'>
    <div className="counter">
      <button className="ButtonsCategory buttonsCounter " onClick={decrement}>
        -
      </button>
      <h1>{count}</h1>
      <button className="ButtonsCategory buttonsCounter" onClick={increment}>
        +
      </button>
      {/*Le asignamos func*/}
    </div>
    {/* Agrego un botón para agregar al carrito que va a llamar a otra fun en app.js */}
    <div className="addCart"><button className='ButtonsCategory ButtonDetails' onClick={()=>onAdd(count)}>Agregar al carrito</button></div>
    </div>
  );
};

export default Counter;
