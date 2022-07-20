import { useContext } from 'react';
import { Container, Heading, Image, Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";
import logoFull from '../assets/img/fullLogo.png';
import logo from '../assets/img/logoMTC.png';
import { NavbarMenuStateContext } from '../contexts/NavbarMenuStateContext';
import CartWidget from './CartWidget';
import '../assets/sass/components/NavBar.scss';
import { ToastContainer } from 'react-toastify';

export default function NavBar() {
  const {active, changeNavbarMenuStatus, hideNavbar} = useContext(NavbarMenuStateContext)

  return (
    <Navbar fixed='top' px='5' >
      <ToastContainer />
      <Container className='navbarDesktop' touch={{display: 'hidden'}} >
        <Navbar.Brand className='navbarBrandDesktop'>
          <Navbar.Item renderAs='div' >
            <Link to={'/home'}>
              <Heading><Image src={logoFull} alt='Manuel Training Coach' /></Heading>
            </Link>
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Container className='navbarMenuDesktopContainer' align='right' >
          <Navbar.Menu className='navbarMenuDesktop'>
            <Link to={'/info'} className='navbarMenuItem'>Nosotros</Link>
            <Navbar.Item className='navbarMenuDropdownItem' hoverable>
              <Navbar.Link>
                <Link to={'/category/all'} className='navbarMenuDropdownLink'>Servicios</Link>
              </Navbar.Link>
              <Navbar.Dropdown>
                <Navbar.Item className='navbarsubMenuItem' renderAs='div' value='item' hoverable>
                  <Navbar.Link>
                    <Link to={'/category/training'} className='subDropdownLink'>Entrenamiento</Link>
                  </Navbar.Link>
                  <Navbar.Dropdown className='subDropdown'>
                    <Link to={'/category/athome'}>
                      <Navbar.Item renderAs='div' value='item'>En casa</Navbar.Item>
                    </Link>
                    <Link to={'/category/atgym'}>
                      <Navbar.Item renderAs='div' value='item'>En gimnasio</Navbar.Item>
                    </Link>
                  </Navbar.Dropdown>
                </Navbar.Item>
              </Navbar.Dropdown>
            </ Navbar.Item>
            <Link to={'/category/promos'} className='navbarMenuItem'>Promociones</Link>
            <Link to={'/contact'} className='navbarMenuItem'>Contacto</Link>
          </Navbar.Menu>
        </Navbar.Container>
        <Navbar.Container className='navbarWidgetsDesktop'>
          <CartWidget />
        </Navbar.Container>
      </Container>

      <Navbar.Container desktop={{display: 'hidden'}} className='navbarMobile' display='flex' justifyContent='space-between' alignItems='center'>
        <Navbar.Burger onClick={()=>{changeNavbarMenuStatus(active)}} className={`${active === true ? 'is-active' : ''}`} aria-label="menu" data-target="navBarMenu"/>
        <Navbar.Menu id='navBarMenu' className={`${active ? 'navBarMenu is-active' : 'navBarMenu'}`} >
          <Link to={'/info'} className='navbarMenuItem' onClick={() => hideNavbar()} >Nosotros</Link>
          <Navbar.Item className='navbarMenuDropdown' hoverable>
            <Navbar.Link>
              <Link to={'/category/all'} className='navbarMenuDropdownLink' onClick={() => hideNavbar()} >Servicios</Link>
            </Navbar.Link>
            <Navbar.Dropdown>
              <Navbar.Item className='navbarsubMenuItem' hoverable>
                <Navbar.Link>
                  <Link to={'/category/training'} className='subDropdownLink' onClick={() => hideNavbar()} >Entrenamiento</Link>
                </Navbar.Link>
                <Navbar.Dropdown className='subDropdown'>
                  <Link to={'/category/athome'}>
                    <Navbar.Item renderAs='div' value='item'>En casa</Navbar.Item>
                  </Link>
                  <Link to={'/category/atgym'}>
                    <Navbar.Item renderAs='div' value='item'>En gimnasio</Navbar.Item>
                  </Link>
                </Navbar.Dropdown>
              </Navbar.Item>
            </Navbar.Dropdown>
          </ Navbar.Item>
          <Link to={'/category/promos'} className='navbarMenuItem' onClick={() => hideNavbar()}>Promociones</Link>
          <Link to={'/contact'} className='navbarMenuItem' onClick={() => hideNavbar()} >Contacto</Link>
        </Navbar.Menu>
        <Navbar.Item className='navbarBrandMobile' renderAs='div' onClick={() => hideNavbar()}>
          <Link to={'/home'}>
            <Heading><Image src={logo} alt='MTC' /></Heading>
          </Link>
        </Navbar.Item>
        <CartWidget />
      </Navbar.Container>
    </Navbar>
  );
}
