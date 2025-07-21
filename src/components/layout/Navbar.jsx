const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-light">
      <div className="max-w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button onClick={onMenuClick} className="lg:hidden text-neutral-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="text-neutral-dark font-sans ml-auto">
            Usuario: <span className="font-semibold text-primary">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;