const Select = ({ label, id, name, required = false, multiple = false, options = [], className = '', ...props }) => {
  const baseStyle = 'shadow-sm appearance-none border rounded w-full py-2 px-3 bg-white text-neutral-dark leading-tight focus:outline-none focus:ring-2 focus:ring-secondary';
  
  // Si es de selección múltiple, la altura se ajusta para mostrar más opciones
  const multipleStyle = multiple ? 'h-32' : '';

  return (
    <div className="mb-2">
      <label htmlFor={id || name} className="block text-neutral-dark text-sm font-bold mb-2 font-sans">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      <select
        id={id || name}
        name={name}
        required={required}
        multiple={multiple}
        className={`${baseStyle} ${multipleStyle} ${className}`}
        {...props}
      >
        {!multiple && <option value="">Seleccione una opción...</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;