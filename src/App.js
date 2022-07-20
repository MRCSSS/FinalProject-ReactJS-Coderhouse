//@ts-check
import { Container } from 'react-bulma-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BackgroundImg from './assets/img/background.jpg';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import CartProvider from './contexts/CartContext';
import NavbarMenuStateContext from './contexts/NavbarMenuStateContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ItemDetailContainer from './pages/ItemDetailContainer';
import ItemListContainer from './pages/ItemListContainer';
import UnderConstruction from './pages/UnderConstruction';
import { initializeApp } from "firebase/app";

export default function App() { 
  initializeApp({
    apiKey: "AIzaSyCRGHaLOrsMGSUfxYHkOE-5Fn-iu898aLE",
    authDomain: "final-coderhouse-reactjs.firebaseapp.com",
    projectId: "final-coderhouse-reactjs",
    storageBucket: "final-coderhouse-reactjs.appspot.com",
    messagingSenderId: "281893609364",
    appId: "1:281893609364:web:72eb876e017a8967f93981"
  });
  
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavbarMenuStateContext>
            <NavBar />
            <Container py={5} style={{maxWidth:'100%', minHeight:'calc(100vh - 340px)', backgroundImage:`url(${BackgroundImg})`, backgroundSize: 'cover'}}>
              <Routes>
                <Route path='/' element={<ItemListContainer />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/category/:category' element={<ItemListContainer />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/contact' element={<UnderConstruction />} />
                <Route path='/home' element={<ItemListContainer />} />
                <Route path='/item/:id' element={<ItemDetailContainer />} />
                <Route path='/info' element={<UnderConstruction />} />
              </Routes>
            </Container>
          </NavbarMenuStateContext>
        </CartProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}
