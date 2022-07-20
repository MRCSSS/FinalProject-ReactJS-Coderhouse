import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import '../assets/sass/pages/UnderConstruction.scss';

export default function UnderConstruction() {
  return (
    <Box className='UnderConstructionBox' textAlign='center'>
      <FontAwesomeIcon icon={faTriangleExclamation} />
      <h2>PÁGINA EN CONSTRUCCIÓN</h2>
      <Link to={'/home'}>
        <Button>Ir a HOME</Button>
      </Link>          
    </Box>
  )
}
