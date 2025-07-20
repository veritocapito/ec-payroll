const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-light">
      <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center">
          <div className="text-neutral-dark font-sans">
            Usuario: <span className="font-semibold text-primary">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;