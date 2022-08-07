import './ItemDetailContainer.css'
import { useState, useEffect } from "react";
import { getProductById } from "../../asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

//Este componente vendría a ser como otra página.
const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    //Leo los datos de la url con useParams
    const { productId } = useParams();

    useEffect(() => {
        getProductById(productId).then(product => { 
            setProduct(product) }).catch(error => { console.log(error) }).finally(()=>{
                setLoading(false)
            })
    }, [productId])


    if(loading){
        return <main className='mainLoading'> <div className="loader"></div></main>
        }
        
    return (
        <main>
            <h1 className='title'>Detalles</h1>
            <ItemDetail {...product} />
        </main>

    )
}

export default ItemDetailContainer

//CHECK