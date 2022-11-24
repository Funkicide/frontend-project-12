import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks';

const Root = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!localStorage.userId) {
      navigate('/login');
    }
  });

  return (
    <div className="container-fluid">
      <div className="row pt-5">
        <div className="col-12">
          <h1 className="text-center mb-3">Chat</h1>
          <button onClick={auth.logOut} type="button" className="btn btn-primary mb-3">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Root;
