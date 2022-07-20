import 'bulma/css/bulma.min.css';
import { useContext, useState } from 'react';
import { Box, Button, Columns, Content, Image } from 'react-bulma-components';
import {Link, useParams} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/sass/components/ItemDetail.scss';
import { CartContext } from '../contexts/CartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({service}) => {
    const { id } = useParams();
    const { title, subtitle, description, price, imgURL} = service

    const [quantity, setQuantity] = useState(1)
    const [shown, setShown] = useState(true)

    const {deleteThis, addItem} = useContext(CartContext)

    const addToCart = () => {
        setShown(false)
        addItem({id:id,...service}, quantity)
    }

    return (
        <Content display='flex' flexDirection='column' alignItems='center' className='ItemDetail'>
            <h2 className='ItemDetailTitle'>SERVICIO</h2>
            <Box className='DesktopItemDetailBox' p={6} mx={5} touch={{display: 'hidden'}} style={{maxWidth:'1800px'}} >
                <Columns className='DesktopItemDetailBoxColumns' m={1}>
                    <Columns.Column display='flex' flexDirection='column' textAlign='center' justifyContent='center' className='DetailInfoColumn' size={3}>
                        <h3 className='ProductTitle' >{title}</h3>
                        <p className='ProductSubtitle'>{subtitle}</p>
                        <p className='ProductDescription' >{description}</p>
                    </Columns.Column>
                    <Columns.Column className='DetailImgColumn' display='flex' flexDirection='column' justifyContent='center' size={6}>
                        <Image src={imgURL} alt={'img-'+id}/>
                    </Columns.Column>
                    <Columns.Column display='flex' flexDirection='column' justifyContent='center' className='DetailCountColumn' size={3} textAlign='center'>
                        <h3 className='PriceTitle'>Precio del servicio</h3>
                        <h3 className='ProductPrice'>$ {price}.00 MXN</h3>
                        <Box className='ActionProductBox' display='flex' flexDirection='column' justifyContent='center'>
                            {shown === true 
                            ? <ItemCount quantity={quantity} setQuantity= {setQuantity} addToCart={addToCart}/> 
                            :   <Box className='shownBox' >
                                    <p className='shownBoxText'>Agregada/s {quantity} unidad/es al carrito</p>
                                    <Link to={'/cart'} style={{color: 'white'}}>
                                        <Button className='toCartButton'>Ir al carrito</Button>
                                    </Link>
                                    <Button onClick={() => {setShown(true);deleteThis(id, quantity)}} className='deleteThisButton'>Eliminar del carrito</Button>
                                </Box>
                            }
                        </Box>
                    </Columns.Column>
                </Columns>
            </Box>

            <Box className='MobileItemDetailBox' mx={5} textAlign='center' desktop={{display: 'hidden'}}>
                <Image m={4} src={imgURL} alt={"imagen_"+id}/>
                <h3 className='ProductTitle' >{title}</h3>
                <p className='ProductSubtitle'>{subtitle}</p>
                <p className='ProductDescription' >{description}</p>
                <h3 className='ProductPrice'>$ {price}.00 MXN</h3>
                <Box className='ActionProductBox' display='flex' flexDirection='column' justifyContent='center'>
                    {shown === true 
                    ? <ItemCount quantity={quantity} setQuantity= {setQuantity} addToCart={addToCart}/> 
                    :   <Box className='shownBox' >
                            <p className='shownBoxText'>Agregada/s {quantity} unidad/es al carrito</p>
                            <Link to={'/cart'} >
                                <Button className='toCartButton'>Ir al carrito</Button>
                            </Link>
                            <Button onClick={() => {setShown(true);deleteThis(id, quantity)}} className='deleteThisButton'>Eliminar del carrito</Button>
                        </Box>
                    }
                </Box>
            </Box>
        </Content>
    )
}

export default ItemDetail