import "./Checkout.css";
import { useContext, useState } from "react";
import CartContext from "../Context/CartContext";
import { db } from "../Services/Firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  where,
  documentId,
  writeBatch,
} from "firebase/firestore"; //Importamos addDoc (agg doc a firestore) y
//collection, o sea, la referencia a donde vamos a subir el doc. DocumentId referencia a la id de un doc.
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Checkout = () => {
  //Del contexto necesitamos el cart para subir los productos a la orden, la cantidad de productos y el total.
  const { cart, getQuantity, totalPriceProd, clearCart } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  //Implemento hook form
  //Register => Registramos los campos del form.
  //HandleSubmit => Para gestionar el envío de datos
  //formState { errors } => Se usa para manejar los errores y avisar al usuario
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  // //Le asignamos a totalQuantity el getQuantity, y tambien getTotal a total
  // // entonces ya no tenemos que escribir código de más

  const totalQuantity = getQuantity();
  const total = totalPriceProd();

  //Generamos la orden con la función createOrder
  const createOrder = async (data) => {
    setIsLoading(true);
    try {
      //Creamos el objeto con los datos del cliente y lo que lleva, esté va a ser subido a la DB en firestore
      const order = {
        buyer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
        Items: cart,
        totalQuantity, //TotalQuantity viene del getQuantity
        total, //Idem que totalQuantity
        date: new Date(),
      };
      //Mapeamos todos los id de los productos para realizar una comparación luego
      const ids = cart.map((prod) => prod.id);

      //Referenciamos la colección ya que luego realizamos una consulta a la db
      const productsRef = collection(db, "products");

      //Traeme los docs con una query o consulta, donde me traigas de la colection products, los docs
      //con el mismo id que los id de la carta y hacelo con una espera.
      const getProductsFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
      );

      //Como getProductsFromFirestore nos trae bastante info, nosotros solo queremos los docs
      //entonces desestructuramos
      const { docs } = getProductsFromFirestore;

      //Necesitamos tener un lugar donde guardar docs sin stock para realizar una compra correctamente.
      const noStock = [];

      const batch = writeBatch(db); //El argumento recibe la ref a la Database

      //Recorremos los docs para verificar la disponibilidad de stock.
      docs.forEach((doc) => {
        const dataIn = doc.data(); //Por cada doc obtenemos la data
        const stockFirestore = dataIn.stock; //El stock está en el dataIn

        //Comparamos trayendonos el stock del carrito
        const getProductToCart = cart.find((prod) => prod.id == doc.id); //Si prod.id es == a doc.id, traelo

        const prodQuantity = getProductToCart?.quantity; //Si se encontraron productos, traenos la cantidad.

        if (stockFirestore >= prodQuantity) {
          //Si el stock de la db es mayor o igual a la cantidad del producto del carro
          //actualizamos el stock
          batch.update(doc.ref, { stock: stockFirestore - prodQuantity });
        } else {
          //Y si no, guardamos el producto en el array fuera de stock.
          noStock.push({ id: doc.id, ...dataIn });
        }
      });

      if (noStock.length === 0) {
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderSuccesfully = await addDoc(orderRef, order);
        console.log(`id de la orden ${orderSuccesfully.id}`);
        clearCart();
        //SI orden es creada, redireccionar.
        setOrderCreated(true);
        //Se navegara al inicio despues de 4 seg.
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        return (
          <main>
            <h2 className="titleCart">
              No se pudo realizar la compra ya que no hay stock en uno de los
              productos elegidos
            </h2>
          </main>
        );
      }

      const orderRef = collection(db, "orders"); //Creamos una collection orders
      addDoc(orderRef, order); //El orderRef es la referencia a la collection 'orders' que vamos a crear en la db
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <main className="mainLoading">
        {" "}
        <div className="loader"></div>{" "}
        <h2 className="titleCart">Se está generando tu orden</h2>
      </main>
    );
  }
  if (orderCreated) {
    return (
      <main>
        <h2 className="titleCart">
          Se ha generado tu orden con éxito, se te redireccionará al inicio en
          unos instantes! El número de orden lo recibiras en tu email en unos
          minutos, gracias por su compra!
        </h2>
      </main>
    );
  }
  return (
    <main>
      <div className="divForm">
        <h2 className="titleCart">Checkout</h2>
        <form className="formCheck" onSubmit={handleSubmit(createOrder)}>
          <div className="divInput">
            <label className="labelForm">Nombre</label>
            <input
              className="inputForm"
              type="text"
              {...register("firstName", {
                required: true,
                maxLength: 15,
              })}
            ></input>
            {errors.firstName?.type === "required" && (
              <p className="obligatory">El campo es requerido</p>
            )}
          </div>
          <div className="divInput">
            <label className="labelForm">Apellido</label>
            <input
              className="inputForm"
              type="text"
              {...register("lastName", {
                required: true,
                maxLength: 20,
              })}
            ></input>
            {errors.lastName?.type === "required" && (
              <p className="obligatory">El campo es requerido</p>
            )}
          </div>
          <div className="divInput">
            <label className="labelForm">Email</label>
            <input
              className="inputForm"
              type="text"
              {...register("email", {
                required: true,
                maxLength: 30,
                pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
              })}
            ></input>
            {errors.email?.type === "required" && (
              <p className="obligatory">El campo es requerido</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="obligatory">El formato del email no es válido</p>
            )}
          </div>
          <div className="divInput">
            <label className="labelForm">Teléfono</label>
            <input
              className="inputForm"
              type="text"
              {...register("phone", {
                required: true,
                maxLength: 30,
              })}
            ></input>
            {errors.phone?.type === "required" && (
              <p className="obligatory">El campo es requerido</p>
            )}
          </div>
          <div className="divInput">
            <label className="labelForm">Dirección</label>
            <input
              className="inputForm"
              type="text"
              {...register("address", { required: true })}
            ></input>
            {errors.address?.type === "required" && (
              <p className="obligatory">El campo es requerido</p>
            )}
          </div>
          <input
            className="ButtonsCategory createOrd"
            type="submit"
            value="Generar orden"
          />
        </form>
      </div>
    </main>
  );
};

export default Checkout;
