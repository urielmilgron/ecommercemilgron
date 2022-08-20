import { useState, createContext } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)
    //Añado item
    const addItem = (productToAdd) => {
        //Si el producto id no esta en el carro => 
        if (!isInCart(productToAdd.id)) {
            //Agregamos el producto al carro
            //Usando el spread operator, podemos agregar algo al carro
            setCart([...cart, productToAdd])
        } else {
            //Realizo un filtro, si el id del producto coincide con algun item dentro de la lista, no entra
            //Proximamente se va a realizar una función ya que se repite dicho filtro.
            const newCartProducts = cart.filter(prod => prod.id !== productToAdd.id)
            //Pusheo nuevamente el producto
            newCartProducts.push(productToAdd)
            //Y lo seteo. Así no puedo llevar más de lo que dice el stock.
            setCart(newCartProducts)
        }

    }
    //Borrar todos los items del carro
    const clearCart = () => {
        //Seteo el carro a un array vacío
        setCart([])
    }
    //Remover item
    const remove = (id) => {
        //Filtro haciendo un nuevo array a partir del carro, si prod.id no se igual al id mencionado, entra al nuevo array.
        const newCartProducts = cart.filter(prod => prod.id !== id)
        //Se setea el nuevo array
        setCart(newCartProducts)
    }
    //Pregunto si el item ya está en el carro
    const isInCart = (id) => {
        //Si el producto es igual al id del producto que se quiere agregar, some retorna true | false
        return cart.some(prod => prod.id === id)
    }
    //Cantidad para el CarWidget
    const getQuantity = () => {
        let acumulador = 0
        cart.forEach(prod => {
            acumulador += prod.quantity
        })
        return acumulador
    }
   //Muestro el total de todos los productos
    const totalPriceProd = () => {
        //Tomo el valor previo total(acumulador), y por cada producto, se multiplica el precio por unidad, acumulandose el precio total de todos los productos
        //El valor inicial es 0.
        return cart.reduce((prevPriceProd, actualPriceProd)=> prevPriceProd + actualPriceProd.quantity * actualPriceProd.price,0)
    }

    const totalProducts = () => {

    }
    return (

        <CartContext.Provider value={{ cart, addItem, getQuantity, isInCart, remove, clearCart, totalPriceProd }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext