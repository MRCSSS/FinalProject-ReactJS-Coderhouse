import { faCartShopping, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Box, Button, Container, Table } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import '../assets/sass/pages/Cart.scss';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const {cart, deleteItem, emptyCart, getItemQty, getItemPrice, getTotalPrice, oneMore, oneLess} = useContext(CartContext)

  return (
    <Container className='Cart'>
      {cart.length <= 0 
      ? <Box className='EmptyCartBox' textAlign='center'>
          <FontAwesomeIcon icon={faCartShopping} />
          <h2>EL CARRITO DE COMPRAS ESTÁ VACÍO</h2>
          <Link to={'/home'}>
            <Button>Ir a comprar</Button>
          </Link>          
        </Box>
      : <>
          <h2 className='ShoppingOrderTitle'>Orden de compra</h2>
          <Box className='ShoppingOrderBox' textAlign='center'>
            <Table tablet={{display:'hidden'}} size='fullwidth'>
              <thead> 
                <tr>
                  <td>Prod</td>
                  <td>Subtotal</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                  <tr key={product.id}>
                    <td className='is-vcentered'>{product.quantity} X {product.title}</td>
                    <td className='is-vcentered'>$ {getItemPrice(product.id)}.00 MXN</td>
                    <td>
                      <Button onClick={()=>{deleteItem(product.id)}}>
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
            <Table mobile={{display:'hidden'}} desktop={{display:'hidden'}} size='fullwidth'>
              <thead> 
                <tr>
                  <td>Producto</td>
                  <td>Subtotal</td>
                  <td>Cantidad</td>
                  <td>Borrar</td>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                  <tr key={product.id}>
                    <td className='is-vcentered'>{product.quantity} X {product.title}</td>
                    <td className='is-vcentered'>$ {getItemPrice(product.id)}.00 MXN</td>
                    <td>
                      <Container display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
                        <Button onClick={()=>{oneLess(product.id)}}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <p className='CountQuantity'>{product.quantity}</p>
                        <Button onClick={()=>{oneMore(product.id)}}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </Container>
                    </td>
                    <td>
                      <Button onClick={()=>{deleteItem(product.id)}}>
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
            <Table touch={{display:'hidden'}} size='fullwidth'>
              <thead> 
                <tr>
                  <td>Producto</td>
                  <td>Precio</td>
                  <td>Subtotal</td>
                  <td>Cantidad</td>
                  <td>Borrar</td>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                  <tr key={product.id}>
                    <td className='is-vcentered'>{product.quantity} X {product.title}</td>
                    <td className='is-vcentered'>$ {product.price}.00 MXN </td>
                    <td className='is-vcentered'>$ {getItemPrice(product.id)}.00 MXN</td>
                    <td>
                      <Container display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
                        <Button onClick={()=>{oneLess(product.id)}}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <p className='CountQuantity'>{product.quantity}</p>
                        <Button onClick={()=>{oneMore(product.id)}}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </Container>
                    </td>
                    <td>
                      <Button onClick={()=>{deleteItem(product.id)}}>
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
          </Box>
          <Box className='OrderTotalBox' display='flex' flexWrap='wrap' flexDirection='column' justifyContent='center' alignItems='center'>
            <Container className='OrderTotal' >
              <Container className='OrderTotalContainerMessage' display='flex' flexWrap='wrap' flexDirection='row' justifyContent='center' alignItems='center'>
                <h3>IMPORTE TOTAL DEL CARRITO: </h3>
                <h3>$ {getTotalPrice()}.00 MXN </h3>
                <h3> ({getItemQty()} producto/s)</h3>
              </Container>
              <Container className='OrderTotalContainerButtons' display='flex' flexWrap='wrap' flexDirection='row' justifyContent='center' alignItems='center'>
                <Link to={'/checkout'}>
                  <Button className='toCheckoutButton'>Finalizar compra</Button>
                </Link>
                <Button className='EmptyCartButton' onClick={()=>{emptyCart()}}>Vaciar carrito</Button>
              </Container>
            </Container>
          </Box>
        </ >
      }
    </Container>
  )
}
