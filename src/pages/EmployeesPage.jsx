import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employee/EmployeeForm';

const EmployeesPage = () => {
  const location = useLocation();
  const { companyId } = useParams();

  // Recibimos los datos de la empresa desde la página anterior
  const company = location.state?.company;

  // Estado para la lista de empleados y el modal del formulario
  const [employees, setEmployees] = useState(company?.employees || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Columnas para la tabla de empleados
  const employeeColumns = [
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Nombres', accessor: 'nombres' },
    { header: 'CUIL', accessor: 'cuil' },
    { 
      header: 'Acciones', 
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="secondary" className="py-1 px-2 text-xs">Editar</Button>
        </div>
      ) 
    },
  ];
  
  // Función para guardar (crear o editar) un empleado
  const handleSaveEmployee = (employeeData) => {
    // Por ahora, solo implementamos la creación
    // A futuro, aquí distinguiremos entre crear y editar
    setEmployees(prev => [...prev, { ...employeeData, id: Date.now() }]);
  };
  
  // Manejo de error si se accede a la página directamente sin datos de la empresa
  if (!company) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold font-sans text-danger mb-4">Error</h1>
        <p className="font-serif mb-6">No se pudo cargar la información de la empresa. Es posible que hayas accedido a esta URL directamente.</p>
        <Link to="/companies">
          <Button variant="primary">Volver al listado de empresas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">Gestión de Empleados</h1>
          <p className="text-lg text-gray-600 font-serif">{company.razonSocial}</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Agregar Empleado
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Table columns={employeeColumns} data={employees} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nuevo Empleado"
      >
        <EmployeeForm
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEmployee}
          companyData={company} 
        />
      </Modal>
    </div>
  );
};

export default EmployeesPage;