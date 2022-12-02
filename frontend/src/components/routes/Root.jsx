import { Outlet } from 'react-router-dom';
import ChatNavbar from '../Navbar';

const Root = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100 bg-light">
      <ChatNavbar />
      <Outlet />
    </div>
  </div>
);

export default Root;
