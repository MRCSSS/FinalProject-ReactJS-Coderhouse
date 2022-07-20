import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Container } from 'react-bulma-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/sass/components/ItemCount.scss';
import base from '../assets/sass/_base.scss';

const ItemCount = ({ quantity, setQuantity, addToCart }) => {
    const checkoutDoneNotif = withReactContent(Swal)

    const sumar = () => { setQuantity(quantity + 1) }
    const restar = () => {
        quantity > 1 
        ? setQuantity(quantity - 1) 
        : checkoutDoneNotif.fire({
            icon: 'warning',
            iconColor: base.amarillo,
            title: 'Es necesaria al menos una unidad para agregar al carrito',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
        })

    }

    return (
        <Box className='ItemCount'>
            <Container className='Count' display='flex' flexWrap='no-wrap' justifyContent='center' alignItems='center'>
                <Button onClick={restar}>
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <p className='CountQuantity'>{quantity}</p>
                <Button onClick={sumar}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </Container>
            <Button className='AddToCartButton' onClick={() => {addToCart()}}  color="info">Agregar al Carrito</Button>
        </Box>

    )
}

export default ItemCount
