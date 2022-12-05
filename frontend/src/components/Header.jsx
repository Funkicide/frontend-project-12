import { Navbar, Button, Container } from 'react-bootstrap';

import { useAuth } from '../hooks';

const Header = () => {
  const auth = useAuth();

  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn && <Button onClick={auth.logOut} variant="primary">Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
