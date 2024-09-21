import { Outlet, useNavigate } from 'react-router-dom';
import { SideNav } from '../Navbar/SideNav';

export const UserLayout = () => {
  return (
    <div className="layout-container" style={{ display: 'flex' }}>
      <SideNav />
      <div style={{ flex: 1 }}>
        {/* Renders the matched child route */}
        <Outlet />
      </div>    
    </div>
  );
};