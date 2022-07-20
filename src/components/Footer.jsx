import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import { Container, Image } from 'react-bulma-components';
import logoFull from '../assets/img/fullLogo.png';
import logo from '../assets/img/logoMTC.png';
import '../assets/sass/components/Footer.scss';

export default function Footer() {
  return (
    <Container className='footer' 
      display='flex' 
      flexDirection='column' 
      alignItems='center'
      textAlign='center'
    >
      <Image 
        src={logo} 
        alt='Manuel Training Coach' 
        style={{width:'100px'}}
      />
      <Image
        src={logoFull}
        alt='Manuel Training Coach' 
        style={{width:'280px', marginTop:'25px', marginBottom:'15px'}}
      />
      <p>Desarrollado por</p>
      <p>Marcos Solis Santiago</p>
      <Container className='soyMSSinfo' textAlign='center'>
        <hr />
        <Container className='MSSicons' display='flex' alignItems='center' justifyContent='space-around' style={{maxWidth:'180px', marginBottom:'7px',}}>
          <a className='iconLink' href='https://www.linkedin.com/in/marcos-sol%C3%ADs-santiago-630b13116/' target='_blank' rel="noreferrer" ><LinkedInIcon /></a>
          <a className='iconLink' href='https://github.com/MRCSSS' target='_blank' rel="noreferrer"><GitHubIcon /></a>
          <a className='iconLink' href="mailto:soymarcossolissantiago@soymss.com" target='_blank' rel="noreferrer" ><MailIcon /></a>
          <a className='iconLink' href='https://instagram.com/soy.mss' target='_blank' rel="noreferrer" ><InstagramIcon /></a>
        </Container>
        <p className='MSS'><a className='MSSlink' href='https://soymss.com/' target='_blank' rel="noreferrer">SoyMSS</a>©  2022.</p>
      </Container>
    </Container>
  )
}
