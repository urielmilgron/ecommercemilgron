import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { getProduct, getProductByCategory } from "../../asyncMock";
import { useParams } from "react-router-dom";

import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]); //Array vacio para guardar productos en useEffect.
  const [loading, setLoading] = useState(true)

  const { categoryId } = useParams(); //Este parametro va a ser el id de la categoría

  useEffect(() => {

    const asyncFunction = categoryId ? getProductByCategory : getProduct //Una vez tengo este operador ternario, podemos solo realizar una sola vez el then => 

    asyncFunction(categoryId).then(products => {
      setProducts(products)
      //Seteo los productos a products en useState.
    }).catch(error => { console.log(error) }).finally(() => {
      setLoading(false)
    })
  }, [categoryId]);

  if (loading) {
    return <main className='mainLoading'> <div className="loader"></div></main>
  }
  return (
    <main>
      <div className='firstTitle'> <h1 className="title">{greeting}</h1></div>
      <section className='productsSection'>
        <ItemList products={products} /></section>
    </main>
  );
};

export default ItemListContainer;

//CHECK
