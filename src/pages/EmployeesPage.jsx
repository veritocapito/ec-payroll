import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCompanies } from '../hooks/useCompanies.js';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employee/EmployeeForm';
import TerminationForm from '../components/employee/TerminationForm';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const EmployeesPage = () => {
  const { companyId } = useParams();
  const { companies, handleSaveEmployee, handleTerminateEmployee } = useCompanies();

  const company = companies.find(c => c.id === parseInt(companyId));
  const employees = company?.employees || [];
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [isTerminationModalOpen, setIsTerminationModalOpen] = useState(false);
  const [employeeToTerminate, setEmployeeToTerminate] = useState(null);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };
  
  const onSave = (employeeData) => {
    handleSaveEmployee(company.id, employeeData);
  };

  const handleOpenTerminationModal = (employee) => {
    setEmployeeToTerminate(employee);
    setIsTerminationModalOpen(true);
  };

  const handleConfirmTermination = (terminationData) => {
    if (employeeToTerminate) {
      handleTerminateEmployee(company.id, employeeToTerminate.id, terminationData);
      setIsTerminationModalOpen(false);
      setEmployeeToTerminate(null);
    }
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
  
  const employeeColumns = [
    { header: 'Legajo', accessor: 'fileNumber' },
    { header: 'Apellido', accessor: 'lastName' },
    { header: 'Nombres', accessor: 'firstName' },
    { header: 'CUIL', cell: (row) => <span className="whitespace-nowrap">{row.cuil}</span> },
    { 
      header: 'Fecha de Ingreso', 
      cell: (row) => row.workPeriods?.[row.workPeriods.length - 1]?.hireDate || '-'
    },
    { header: 'Categoría', accessor: 'category' },
    { header: 'Remuneración', cell: (row) => ( <span className="whitespace-nowrap">{`$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 }).format(row.salary || 0)}`}</span> ) },
    { 
      header: 'Acciones', 
      cell: (row) => (
        <div className="flex items-center">
          <Link to={`/companies/${companyId}/employees/${row.id}`} state={{ employee: row, company: company }} title="Ver Empleado">
            <IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton>
          </Link>
          <IconButton size="small" onClick={() => handleOpenEditModal(row)} title="Editar Empleado">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleOpenTerminationModal(row)} title="Registrar Baja">
            <ArchiveIcon fontSize="small" />
          </IconButton>
        </div>
      ) 
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">Gestión de Empleados</h1>
          <p className="text-lg text-gray-600 font-serif">{company.razonSocial}</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="primary" onClick={handleOpenAddModal}>+ Agregar Empleado</Button>
          <Link to="/companies"><Button variant="secondary">← Volver a Empresas</Button></Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Table columns={employeeColumns} data={employees} />
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingEmployee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
      >
        <EmployeeForm
          onClose={() => setIsFormModalOpen(false)}
          onSave={onSave}
          companyData={company}
          initialData={editingEmployee}
        />
      </Modal>
            <Modal
        isOpen={isTerminationModalOpen}
        onClose={() => setIsTerminationModalOpen(false)}
        title={`Registrar Baja de ${employeeToTerminate?.firstName} ${employeeToTerminate?.lastName}`}
      >
        <TerminationForm 
          onClose={() => setIsTerminationModalOpen(false)}
          onConfirm={handleConfirmTermination}
        />
      </Modal>
    </div>
  );
};

export default EmployeesPage;