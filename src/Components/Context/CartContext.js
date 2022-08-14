import { useState, createContext } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)
    //Añado item
    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            //Usando el spread operator, podemos agregar algo al carro
            setCart([...cart, productToAdd])
        } else {
            alert("Ya agregó ese producto, agregue otro")
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
    return (

        <CartContext.Provider value={{ cart, addItem, getQuantity, isInCart, remove, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext