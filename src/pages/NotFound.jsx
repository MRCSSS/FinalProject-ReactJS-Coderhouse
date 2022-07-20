import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import '../assets/sass/pages/NotFound.scss';

export default function NotFound() {
  return (
    <Box className='NotFoundBox' textAlign='center'>
      <FontAwesomeIcon icon={faClipboardQuestion} />
      <h2>SERVICIO NO ENCONTRADO</h2>
      <Link to={'/home'}>
        <Button>Ir a HOME</Button>
      </Link>          
    </Box>
  )
}
