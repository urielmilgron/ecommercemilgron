import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../Services/Firebase";

import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]); //Array vacio para guardar productos en useEffect.
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams(); //Este parametro va a ser el id de la categoría

  useEffect(() => {
    //CollectionRef es igual a => Si no tengo categoryId, pasame los productos, y si no, consultame dentro de la coleccion, la categoria que sea igual a categoryId
    const collectionRef = !categoryId
      ? collection(db, "products")
      : query(collection(db, "products"), where("category", "==", categoryId));
    //Obtenemos los docs de la coleccion 'products' que está en la ref de la db
    getDocs(collectionRef)
      .then((response) => {
        //Mapeamos los docs de la respuesta, que es donde está el array
        const productsData = response.docs.map((doc) => {
          //Por cada doc(producto), agregamos un objeto al array
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        //Seteamos los productos, que en este caso es el productsData
        setProducts(productsData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return (
      <main className="mainLoading">
        {" "}
        <div className="loader"></div>
      </main>
    );
  }
  return (
    <main>
      <div className="containerList">
        <div className="firstTitle">
          {" "}
          <h1 className="title">{categoryId == undefined? 'HOME' : categoryId.toUpperCase()}</h1>
        </div>
        <section className="productsSection">
          <ItemList products={products} />
        </section>
      </div>
    </main>
  );
};

export default ItemListContainer;

//CHECK
