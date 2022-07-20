import 'bulma/css/bulma.min.css';
import React from 'react';
import { Container } from 'react-bulma-components';
import Item from './Item';
import Loading from './Loading';

const ItemList = ({ services }) => {
    return (
        <>
            <Container className='ItemList' display='flex' flexWrap='wrap' justifyContent='center'>
                {services === undefined 
                ? <Loading />
                : services.map(service => <Item key={service.id} service={service} />)}
            </Container>
        </ >
    )
}

export default ItemList
