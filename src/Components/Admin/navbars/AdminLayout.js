import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSideNav } from './AdminSideNav';

export const AdminLayout = () => {
  return (
    <div className="layout-container" style={{ display: 'flex' }}>
      <AdminSideNav />
      <div style={{ flex: 1 }}>
        {/* Renders the matched child route */}
        <Outlet />
      </div>    
    </div>
  );
};