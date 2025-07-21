import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const baseLinkStyle = "flex items-center p-2 text-neutral-dark rounded-lg hover:bg-neutral-light group font-sans font-semibold";
  const activeLinkStyle = "bg-slate-200 text-primary";

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" // Cambiado a lg:hidden
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside 
        className={`w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-30 
                   lg:relative lg:translate-x-0 // Cambiado a lg:
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="p-4 border-b border-neutral-light">
          <a href="/" className="flex flex-col items-center text-center">
            <img src="https://i.postimg.cc/x8rJB2vY/logo.jpg" alt="Logo Estudio Capobianco" className="h-16 w-auto rounded-md" />
            <div className="text-lg font-bold font-sans mt-3">
              <span className="text-primary">Payroll</span>
              <span className="text-accent">&</span>
              <span className="text-neutral-dark">RRHH</span>
            </div>
          </a>
        </div>
        <div className="px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : ''}`}
                onClick={() => setIsOpen(false)} // Se agrega onClick para cerrar
              >
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/companies"
                className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : ''}`}
                onClick={() => setIsOpen(false)} // Se agrega onClick para cerrar
              >
                <span className="ml-3">Empresas</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;