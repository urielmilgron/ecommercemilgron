import "./ItemDetailContainer.css";
import { useState, useEffect } from "react";
import { getProductById } from "../../asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Services/Firebase";

//Este componente vendría a ser como otra página.
const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  //Leo los datos de la url con useParams
  const { productId } = useParams();

  useEffect(() => {
    //Obtenemos un doc(producto) de la db en la coleecion productos y recibe la id del producto a detallar
    getDoc(doc(db, "products", productId))
      .then((response) => {
        //data es igual a la data de la respuesta, que en este caso obtenias todo sin id
        const data = response.data();
        //el id lo sacabas antes del data, por eso hacemos otra conversion.
        const productData = { id: response.id, ...data };
        //Seteamos el producto con productData
        setProduct(productData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <main className="mainLoading">
        {" "}
        <div className="loader"></div>
      </main>
    );
  }

  return (
    <main id="mainDetail">
      <h1 className="title">Detalles</h1>
      <ItemDetail {...product} />
    </main>
  );
};

export default ItemDetailContainer;

//CHECK
