import { Navbar, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('components.header.brandLink')}</Navbar.Brand>
        {auth.loggedIn && <Button onClick={auth.logOut} variant="primary">{t('components.header.logOutButton')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
