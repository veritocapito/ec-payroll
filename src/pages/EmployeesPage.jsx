import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employee/EmployeeForm';

const EmployeesPage = () => {
  const location = useLocation();
  const { companyId } = useParams();
  const company = location.state?.company;

  const [employees, setEmployees] = useState(company?.employees || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employeeColumns = [
    { header: 'Legajo', accessor: 'legajo' },
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Nombres', accessor: 'nombres' },
    { 
      header: 'CUIL',
      cell: (row) => <span className="whitespace-nowrap">{row.cuil}</span>
    },
    { header: 'Fecha de Ingreso', accessor: 'fechaIngreso' },
    { header: 'Categoría', accessor: 'categoria' },
    { 
      header: 'Acciones', 
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/companies/${companyId}/employees/${row.id}`} state={{ employee: row, company: company }}>
            <Button variant="secondary" className="py-1 px-2 text-xs">Ver</Button>
          </Link>
          <Button variant="secondary" className="py-1 px-2 text-xs">Editar</Button>
          <Button variant="info" className="py-1 px-2 text-xs whitespace-nowrap">Registrar Baja</Button>
        </div>
      ) 
    },
  ];
  
  const handleSaveEmployee = (employeeData) => {
    setEmployees(prev => [...prev, { ...employeeData, id: Date.now() }]);
  };
  
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">Gestión de Empleados</h1>
          <p className="text-lg text-gray-600 font-serif">{company.razonSocial}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Agregar Empleado</Button>
          <Link to="/companies"><Button variant="secondary">← Volver a Empresas</Button></Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Table columns={employeeColumns} data={employees} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nuevo Empleado">
        <EmployeeForm onClose={() => setIsModalOpen(false)} onSave={handleSaveEmployee} companyData={company}/>
      </Modal>
    </div>
  );
};

export default EmployeesPage;