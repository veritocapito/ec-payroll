import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Fondo del modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Contenido del modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-4xl"> {/* <-- CAMBIO AQUÍ */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold font-sans text-primary">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto"> {/* Añadimos scroll por si el contenido es muy alto */}
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;