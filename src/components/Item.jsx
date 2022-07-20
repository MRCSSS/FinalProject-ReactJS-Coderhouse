import 'bulma/css/bulma.min.css';
import { Button, Card, Content, Media } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import '../assets/sass/components/Item.scss';

const Item = ({ service }) => {
    const { cardTitle, cardDescription, id, imgURL, price, title} = service

    return (
        <Card className='Item' >
            <Card.Image
                className='cardImg'
                size='4by3'
                src={imgURL}
                alt={title}
            />
            <Card.Content className='cardContent' textAlign='center' >
                <Media>
                    <Media.Item display='flex' flexDirection='column'>
                        <p className='cardTitle'>{cardTitle}</p>
                        <p className='cardDescrip'>{cardDescription}</p>
                    </Media.Item>
                </Media>
                <Content>
                    <p className='cardPrice'>$ {price}.00 MXN</p>
                    <Button className='cardButton' color='primary'>
                        <Link className='cardButtonLink' to={"/item/"+id} style={{color:'white'}}>Detalles del producto</Link>
                    </Button>
                </Content>
            </Card.Content>
        </Card>
    );
}

export default Item