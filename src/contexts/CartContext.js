import React, { createContext, useState }from 'react';
import {toast} from 'react-toastify';

export const CartContext = createContext([]);

const { Provider }= CartContext;

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // ItemDetail - Metodo Some - Detecta si el producto a agregar ya está en el carrito. Retorna booleano.
    const isInCart = (id) => {
        return cart.some(x => x.id === id)
    }

    // ItemDetail - Agrega producto al cart, sin sobreponerse a los ya agregados. Aumenta la cantidad.
    const addItem = (product, quantity) => {
        const newProduct = {...product, quantity}
        const auxArr = [...cart]

        if (isInCart(newProduct.id)) {
            const findProd = cart.find(x => x.id === newProduct.id)
            const prodIndex = cart.indexOf(findProd)

            auxArr[prodIndex].quantity += quantity
        } else {
            auxArr.push(newProduct)
        }
        setCart(auxArr)

        toast(`${quantity} productos agregados al Carrito`, {
            position: "top-right",
            autoClose: 2150,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: 'success',
            theme: 'colored'
        })
    }

    // Vaciar carrito - Cart - Botón.
    const emptyCart = () => {
        setCart([])
        toast(`Carrito VACÍO`, {
            position: "top-right",
            autoClose: 2150,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: 'error',
            theme: 'colored'
        })
    }

    // Vaciar carrito después de comprar.
    const newCart = () => {
        setCart([])
    }

    // Método filter - Cart - En función del ID, retorna un array sin el producto seleccionado.
    const deleteItem = (id) => {
        toast(`Producto eliminado de Carrito`, {
            position: "top-right",
            autoClose: 2150,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: 'error',
            theme: 'colored'
        })

        return setCart(cart.filter(x => x.id !== id))
    }

    // Método Reduce - CartWidget - Retorna la cantidad total de unidades en el state del cart.
    const getItemQty = () => {
        return cart.reduce((acc, x) => acc += x.quantity, 0)
    }

    // Método Reduce - Cart - Retorna el precio total del cart.
    const getItemPrice = (id) => {
        const findProd = cart.find(x => x.id === id)
        const prodIndex = cart.indexOf(findProd)

        return cart[prodIndex].quantity * cart[prodIndex].price
    }

    // Reduce una vez la cantidad del producto segun su id.
    const oneLess = (id) => {
        const auxArr = [...cart]
        const findProd = cart.find(x => x.id === id)
        const prodIndex = cart.indexOf(findProd)

        if (auxArr[prodIndex].quantity > 1 ) {
            auxArr[prodIndex].quantity = cart[prodIndex].quantity - 1
            setCart(auxArr)
        } else if (auxArr[prodIndex].quantity <= 1) {
            deleteItem(id)
        }
    }

    // Aumenta una vez la cantidad del producto segun su id.
    const oneMore = (id) => {
        const auxArr = [...cart]

        const findProd = cart.find(x => x.id === id)
        const prodIndex = cart.indexOf(findProd)

        auxArr[prodIndex].quantity = cart[prodIndex].quantity + 1

        setCart(auxArr)
    }

    // Método Reduce - Cart - Retorna el precio total del cart.
    const getTotalPrice = () => {
        return cart.reduce((acc, x) => acc += x.quantity * x.price, 0)
    }

    const deleteThis = (id,quantity) => {
        const auxArr = [...cart]
        const findProd = cart.find(x => x.id === id)
        const prodIndex = cart.indexOf(findProd)

        auxArr[prodIndex].quantity = cart[prodIndex].quantity - quantity

        if (auxArr[prodIndex].quantity >= 1 ) {
            setCart(auxArr)
        } else if (auxArr[prodIndex].quantity <= 0) {
            deleteItem(id)
        }

        toast(`Unidades removidas de Carrito`, {
            position: "top-right",
            autoClose: 2150,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: 'warning',
            theme: 'colored'
        })
    }

    return (
        <Provider value={{cart, isInCart, addItem, deleteThis, emptyCart, deleteItem, getItemQty, getItemPrice, getTotalPrice, newCart, oneMore, oneLess}}>{children}</Provider>
    )
}
