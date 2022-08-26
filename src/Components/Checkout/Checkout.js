import CartContext from "../Context/CartContext"
import { useContext, useState } from "react"
import { db } from '../../services/firestore'
import { addDoc, collection, getDoc, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore' //Importamos addDoc (agg doc a firestore) y 
//collection, o sea, la referencia a donde vamos a subir el doc. DocumentId referencia a la id de un doc.
import { useNavigate } from "react-router-dom"

const Checkout = () => {
//Del contexto necesitamos el cart para subir los productos a la orden, la cantidad de productos y el total.
const { cart, getQuantity, getTotal, clearCart } = useContext(CartContext) 
const [isLoading, setIsLoading] = useState(false)
const [ orderCreated, setOrderCreated] = useState(false)
const navigate = useNavigate()
//Le asignamos a totalQuantity el getQuantity, y tambien getTotal a total
// entonces ya no tenemos que escribir código de más

totalQuantity = getQuantity()
total = getTotal()

    //Generamos la orden con la función createOrder
    const createOrder = async () => {

        try{
            setIsLoading(true)
        //Creamos el objeto con los datos del cliente y lo que lleva, esté va a ser subido a la DB en firestore
        const order = {
            buyer: {
                firstName: '', lastName: '', phone: '', address: ''
            },
            Items: cart,
            totalQuantity, //TotalQuantity viene del getQuantity
            total, //Idem que totalQuantity
            date: new Date()
        }
        //Mapeamos todos los id de los productos para realizar una comparación luego
        const ids = cart.map(prod => prod.id)

        //Referenciamos la colección ya que luego realizamos una consulta a la db
        const productsRef = collection(db, 'products')

        //Traeme los docs con una query o consulta, donde me traigas de la colection products, los docs 
        //con el mismo id que los id de la carta y hacelo con una espera.
        const getProductsFromFirestore = await getDocs(query(productsRef,where(documentId, 'in', ids)))

        //Como getProductsFromFirestore nos trae bastante info, nosotros solo queremos los docs
        //entonces desestructuramos
        const { docs } = getProductsFromFirestore

         //Necesitamos tener un lugar donde guardar docs sin stock para realizar una compra correctamente.
        const noStock = []

        const batch = writeBatch(db) //El argumento recibe la ref a la Database

        //Recorremos los docs para verificar la disponibilidad de stock.
        docs.forEach(doc => {
            const dataIn = doc.data() //Por cada doc obtenemos la data
            const stockFirestore = dataIn.stock //El stock está en el dataIn 

            //Comparamos trayendonos el stock del carrito
            const getProductToCart = cart.find(prod => prod.id == doc.id) //Si prod.id es == a doc.id, traelo

            const prodQuantity = getProductToCart?.quantity //Si se encontraron productos, traenos la cantidad.

            if(stockFirestore>=prodQuantity){ //Si el stock de la db es mayor o igual a la cantidad del producto del carro
                //actualizamos el stock 
                batch.update(doc.ref, { stock: stockFirestore - prodQuantity})
            } else {
                //Y si no, guardamos el producto en el array fuera de stock.
            noStock.push({id:doc.id, ...dataIn})
            }
        })

        if(noStock.length === 0){
            await batch.commit()
            const orderRef = collection(db,'orders')
            const orderSuccesfully = await addDoc(orderRef, order)
            console.log(`id de la orden ${orderSuccesfully.id}`)
            clearCart()
            //SI orden es creada, redireccionar.
            setOrderCreated(true)
            //Se navegara al inicio despues de 3 seg.
            setTimeout(() => {
                navigate('/')
            },3000)
        } else {
            console.log("No se pudo realizar la compra ya que no hay stock en uno de los productos elegidos")
        }
      
      

        const orderRef = collection(db, 'orders') //Creamos una collection orders
        addDoc(orderRef, order) //El orderRef es la referencia a la collection 'orders' que vamos a crear en la db 
    }catch(error){
        console.log(error)
    } finally{
        setIsLoading(false)
    }
    if(isLoading){
        return <main className='mainLoading'> <div className="loader"></div></main>
    } 
    if(orderCreated){
        //Lo que va a decir el html cuando la orden sea creada.
    }

    } 
return (

    //Aca va lo gráfivo y el form
)



}