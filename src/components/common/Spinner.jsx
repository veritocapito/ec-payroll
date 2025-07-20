const Spinner = ({ className = '' }) => {
  const baseStyle = 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500';

  return (
    <div className="flex justify-center items-center">
      <div className={`${baseStyle} ${className}`}></div>
    </div>
  );
};

export default Spinner;