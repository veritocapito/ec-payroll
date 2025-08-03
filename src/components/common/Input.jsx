const Input = ({ label, id, name, type = 'text', value, onChange, placeholder, className = '', required = false, endIcon, onEndIconClick, ...props }) => {
  const baseStyle = 'shadow-sm appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:ring-2 focus:ring-secondary';
  const paddingStyle = endIcon ? 'pr-10' : '';

  return (
    <div className="mb-2">
      <label htmlFor={id || name} className="block text-neutral-dark text-sm font-bold mb-2 font-sans">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id || name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseStyle} ${paddingStyle} ${className}`}
          required={required}
          {...props}
        />
        {endIcon && (
          <div 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            onClick={onEndIconClick}
          >
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;