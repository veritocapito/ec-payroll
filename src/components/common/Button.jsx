const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyle = 'font-sans font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200';

  const variants = {
    primary: 'bg-accent hover:bg-accent-dark text-white',
    secondary: 'bg-neutral-light hover:bg-slate-300 text-neutral-dark', // Usamos los colores neutros
    danger: 'bg-danger hover:opacity-90 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white'
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;