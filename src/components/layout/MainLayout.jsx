import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx'; 
import Sidebar from './Sidebar.jsx';

const MainLayout = () => {
  return (
    // Usamos el color de fondo principal definido en la paleta
    <div className="flex h-screen bg-neutral-light">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;