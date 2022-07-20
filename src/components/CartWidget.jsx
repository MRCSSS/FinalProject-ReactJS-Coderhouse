import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bulma/css/bulma.min.css';
import { useContext } from 'react';
import { Icon } from "react-bulma-components";
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { NavbarMenuStateContext } from '../contexts/NavbarMenuStateContext';
import '../assets/sass/components/CartWidget.scss';


export default function CartWidget() {
    const {getItemQty} = useContext(CartContext)
    const {hideNavbar} = useContext(NavbarMenuStateContext)

	return (
        <Link to={'/cart'} className='cartWidgetLink' onClick={() => hideNavbar()} >
            <Icon
                color='default'
                size='large'
            >
                <FontAwesomeIcon icon={faCartShopping} />
            </Icon>
            <span className={getItemQty() <= 0 ? 'cartNumber is-hidden' : 'cartNumber'} >{getItemQty()}</span>
        </Link>
	);
}