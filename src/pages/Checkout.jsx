import { faCircleCheck, faEnvelope, faMobileScreen, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { Box, Button, Columns, Container, Form, Icon } from 'react-bulma-components';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../assets/sass/pages/Checkout.scss';
import base from '../assets/sass/_base.scss';
import { CartContext } from '../contexts/CartContext';

export default function Checkout() {
    const checkoutDoneNotif = withReactContent(Swal)
    const {cart, getItemPrice, getTotalPrice, newCart} = useContext(CartContext)
    const [orderID, setOrderID] = useState('')
    let navigate = useNavigate();
    
    async function makeNewOrder(newOrder) {
        Swal.showLoading()
        const db = getFirestore()
        const odersCollection = collection(db,'orders')
        await addDoc(odersCollection, newOrder).then(({ id }) => {
            setOrderID(id)
        })
        Swal.close()
    }

    return (
        <>
            <h2 className='CheckoutTitle' >Resumen de compra</h2>
            <Box className='CheckoutBox' textAlign='center'>
                <Columns>
                    <Columns.Column>
                        <Box>
                            <h3>Productos</h3>
                                {cart.map((product) => {
                                    return (
                                        <Container key={product.id} className={"serviceContainer "+product.id} display='flex' flexDirection='row' alignItems='center'>
                                            <Container className="subtotalDescription" display='flex' flexDirection='column' alignItems='start' >
                                                <div className="subtotalTitle" >{product.quantity} <FontAwesomeIcon icon={faXmark} /> {product.title}</div>
                                                <div className="subtotalContent" >{product.quantity} <FontAwesomeIcon icon={faXmark} /> ${product.price}.00 MXN</div>
                                            </Container>
                                            <p className="subTotal">${getItemPrice(product.id)}</p>
                                        </Container>
                                    )
                                })}
                            <hr/>
                            <Container display='flex' flexWrap='wrap' justifyContent='center'>
                                <h3 className='lastPriceTitle'>IMPORTE FINAL: </h3>
                                <h3 className='lastPrice'> $ {getTotalPrice()}.00 MXN</h3>
                            </Container>
                        </Box>
                    </Columns.Column>
                    <Columns.Column>
                        <Box>
                            <h3>Datos Personales</h3>
                            <Container textAlign='left' >
                                <Formik
                                    initialValues={{
                                        name: '',
                                        email: '',
                                        phone: ''
                                    }}
                                    validate={(values) => {;
                                        let errors = {}

                                        // Validación de nombre
                                        if(!values.name) {
                                            errors.name = 'Ingrese su nombre, por favor.'
                                        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}\s[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
                                            errors.name = 'Ingrese al menos un nombre y un apellido que solo contengan letras.'
                                        }

                                        // Validación de correo
                                        if(!values.email) {
                                            errors.email = 'Ingrese su dirección de correo electrónico, por favor.'
                                        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                                            errors.email = 'Dirección de correo electrónico inválida.'
                                        }

                                        // Validación de teléfono
                                        if(!values.phone) {
                                            errors.phone = 'Ingrese su número de teléfono, por favor.'
                                        } else if (!/^[\d]{10}$/.test(values.phone)) {
                                            errors.phone = 'El teléfono solo puede contener números. Escribalo a 10 dígitos.'
                                        }

                                        return errors
                                    }}
                                    onSubmit={(values) => {
                                        const {name, email, phone} = values
                                        const order = {
                                            buyer: { name, email, phone},
                                            items: cart,
                                            total: getTotalPrice()
                                        }
                                        
                                        if (order.total >= 1) {
                                            checkoutDoneNotif.fire({
                                                text: 'Procesando orden de compra',
                                                showConfirmButton: false,
                                                color: base.fondoObscuro,
                                                background: base.azul,
                                                iconColor: base.amarillo,
                                                didOpen: () => { makeNewOrder(order) },
                                            }).then(() => {
                                                return (
                                                    checkoutDoneNotif.fire({
                                                        icon: 'success',
                                                        iconColor: base.colorPrincipal,
                                                        color: base.fondoClaro,
                                                        title: 'Orden de compra realizada con éxito',
                                                        text: 'Pronto te contactaremos para concluir la compra.',
                                                        showConfirmButton: true,
                                                        confirmButtonText: 'OK',
                                                        confirmButtonColor: base.amarillo,
                                                        willClose: () => {
                                                            navigate('/')
                                                            newCart()
                                                        }
                                                    })
                                                )
                                            })
                                        } else {
                                            checkoutDoneNotif.fire({
                                                icon: 'error',
                                                iconColor: base.rojo,
                                                color: base.fondoClaro,
                                                title: 'Carrito de compras vacío',
                                                text: 'Serás redireccionado a la página de inicio.',
                                                showConfirmButton: false,
                                                timer: 6800,
                                                timerProgressBar: true,
                                                willClose: () => {
                                                    navigate('/')
                                                    newCart()
                                        }
                                            })
                                        }
                                    }}
                                >
                                    {({values, errors, handleBlur, handleChange, handleSubmit, touched}) => (
                                        <form onSubmit={handleSubmit}>
                                            <Form.Field className='buyerField' >
                                                <Form.Label>Nombre completo</Form.Label>
                                                <Form.Control>
                                                    <Form.Input
                                                        rounded
                                                        id='name'
                                                        name='name'
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={(touched.name && values.name && !errors.name)
                                                            ? 'success'
                                                            : (touched.name && errors.name)
                                                            ? 'danger'
                                                            : ''
                                                        }
                                                    />
                                                    <Icon align="left" size="small" >
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </Icon>
                                                    <Icon align="right" size="small" color={(touched.name && values.name && !errors.name)
                                                            ? 'success'
                                                            : (touched.name && errors.name)
                                                            ? 'danger'
                                                            : ''
                                                        }>
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </Icon>
                                                </Form.Control>
                                                {(touched.name && errors.name) ? <Form.Help color="danger">{errors.name}</Form.Help> : '' }
                                            </Form.Field>
                                            <Form.Field className='buyerField' >
                                                <Form.Label>Correo electrónico</Form.Label>
                                                <Form.Control>
                                                    <Form.Input
                                                        rounded
                                                        id='email'
                                                        name='email'
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={(touched.email && values.email && !errors.email)
                                                            ? 'success'
                                                            : (touched.email && errors.email)
                                                            ? 'danger'
                                                            : ''
                                                        }
                                                    />
                                                    <Icon align="left" size="small">
                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                    </Icon>
                                                    <Icon align="right" size="small" color={(touched.email && values.email && !errors.email)
                                                            ? 'success'
                                                            : (touched.email && errors.email)
                                                            ? 'danger'
                                                            : ''
                                                        }>
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </Icon>
                                                </Form.Control>
                                                {(touched.email && errors.email) ? <Form.Help color="danger">{errors.email}</Form.Help> : '' }
                                            </Form.Field>
                                            <Form.Field className='buyerField' >
                                                <Form.Label>Teléfono</Form.Label>
                                                <Form.Control>
                                                    <Form.Input
                                                        rounded
                                                        id='phone'
                                                        name='phone'
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={(touched.phone && values.phone && !errors.phone)
                                                            ? 'success'
                                                            : (touched.phone && errors.phone)
                                                            ? 'danger'
                                                            : ''
                                                        }
                                                    />
                                                    <Icon align="left" size="small">
                                                        <FontAwesomeIcon icon={faMobileScreen} />
                                                    </Icon>
                                                    <Icon align="right" size="small" color={(touched.phone && values.phone && !errors.phone)
                                                            ? 'success'
                                                            : (touched.phone && errors.phone)
                                                            ? 'danger'
                                                            : ''
                                                        }>
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </Icon>
                                                </Form.Control>
                                                {(touched.phone && errors.phone) ? <Form.Help color="danger">{errors.phone}</Form.Help> : '' }
                                            </Form.Field>
                                            <Form.Field className='buyerField' kind="group">
                                                <Form.Control >
                                                    <Button type='submit' color="link" >CONFIRMAR COMPRA</Button>
                                                </Form.Control>
                                            </Form.Field>
                                        </form>
                                    )}
                                </Formik>
                            </Container>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Box>
        </>
    )
}
