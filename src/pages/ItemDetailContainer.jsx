import React, { useEffect, useState } from 'react';
import ItemDetail from '../components/ItemDetail';
import Loading from '../components/Loading';
import NotFound from '../pages/NotFound';
import {useParams} from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export default function ItemDetailContainer() {
    const { id } = useParams();
    const [service, setService] = useState();

    async function data(db, id) {
        const serviceToFind = doc(db, 'products', id);
        const servicesSnapshop = await getDoc(serviceToFind);

        if (servicesSnapshop.exists()) {
            return servicesSnapshop.data()
        } else {
            return 'Not found'
        }
    }

    useEffect(() => {
        const db = getFirestore();

        data(db, id)
            .then(data => { setService(data) })
            .catch( error => console.error( error ))

    },[id])

      
    return (
        <>
            {service === undefined ? <Loading /> :
            service === 'Not found'? <NotFound /> :
                                    <ItemDetail service={service} />
            }
        </ >
    )
}
