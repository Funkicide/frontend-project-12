import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Navbar, Container, Button,
} from 'react-bootstrap';

import Chat from '../Chat';

import { useAuth } from '../../hooks';
import routes from '../../routes';

import { actions } from '../../slices';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Root = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.userId) {
      navigate('/login');
    }
  });

  useEffect(() => {
    const authHeader = getAuthHeader();

    const getData = async () => {
      const response = await axios.get(routes.usersPath(), {
        headers: authHeader,
      });
      dispatch(actions.setInitialState(response.data));
    };
    getData();
  });

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100 bg-light">
        <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
          <Container>
            <Navbar.Brand href="#chat">Chat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Button onClick={auth.logOut} variant="primary">Log Out</Button>
          </Container>
        </Navbar>
        <Chat />
      </div>
    </div>
  );
};

export default Root;
