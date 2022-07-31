import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { getProduct } from "../../asyncMock";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]); //Array vacio para guardar productos en useEffect.
  console.log(products);
  useEffect(() => {
    getProduct().then((products) => {
      setProducts(products); //Seteo los productos a products en useState.
    });
  }, []);

  return (
    <main>
     <div className='firstTitle'> <h1 className="title">{greeting}</h1></div>
     <section className='productsSection'>
      <ItemList products={products}/></section>
    </main>
  );
};

export default ItemListContainer;
