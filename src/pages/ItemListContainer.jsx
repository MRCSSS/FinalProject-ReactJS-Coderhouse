import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import ItemList from '../components/ItemList';
import { NavbarMenuStateContext } from '../contexts/NavbarMenuStateContext';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export default function ItemListContainer() {
  const { category } = useParams();
  const [services, setServices] = useState();
  const {hideNavbar} = useContext(NavbarMenuStateContext)

  async function data(db) {
    const itemsCollection = collection(db, 'products');
    const itemsSnapshot = await getDocs(itemsCollection);
    const servicesData = itemsSnapshot.docs.map(doc => ({id: doc.id,...doc.data()}));
    return servicesData;
  }

  useEffect(() => {
    let filterProducts = [];
    const db = getFirestore();
    data(db).then(data => {
      data.forEach(service => {
        if((category === undefined || category === 'all' || category === 'training') && (service.category === 'athome' || service.category === 'atgym')) {
          filterProducts.push(service);
        } else if (category === 'atgym' && service.category === 'atgym' ) {
          filterProducts.push(service);
        } else if (category === 'athome' && service.category === 'athome' ) {
          filterProducts.push(service);
        } else if (category === 'promos' && service.category === 'promo' ) {
          filterProducts.push(service);
        }
      });
      setServices(filterProducts);
    })

    .catch( error => console.error( error ))

  },[category])

  return (
    <Container className='ItemListContainer' onClick={() => hideNavbar()} style={{maxWidth:'1550px'}}>
      <ItemList services={services} />
    </Container>
  );
}
