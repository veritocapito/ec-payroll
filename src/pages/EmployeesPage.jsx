import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCompanies } from '../context/CompaniesContext'; // <-- Se usa el hook del contexto
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import EmployeeForm from '../components/employee/EmployeeForm';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const EmployeesPage = () => {
  const { companyId } = useParams();
  // Obtenemos los datos y funciones directamente del contexto
  const { companies, handleSaveEmployee } = useCompanies();

  // Encontramos la empresa correcta usando el 'companyId' de la URL
  const company = companies.find(c => c.id === parseInt(companyId));
  // Derivamos la lista de empleados de la empresa encontrada
  const employees = company?.employees || [];
  
  // El estado de los modales es local a la página
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };
  
  // Esta función ahora solo necesita llamar a la función del contexto
  const onSave = (employeeData) => {
    handleSaveEmployee(company.id, employeeData);
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
    { header: 'Legajo', accessor: 'legajo' },
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Nombres', accessor: 'nombres' },
    { header: 'CUIL', cell: (row) => <span className="whitespace-nowrap">{row.cuil}</span> },
    { header: 'Remuneración', cell: (row) => ( <span className="whitespace-nowrap">{`$ ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 }).format(row.remuneracion || 0)}`}</span> ) },
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
          <IconButton size="small" onClick={() => console.log('Registrar Baja:', row.id)} title="Registrar Baja">
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEmployee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
      >
        <EmployeeForm
          onClose={() => setIsModalOpen(false)}
          onSave={onSave}
          companyData={company}
          initialData={editingEmployee}
        />
      </Modal>
    </div>
  );
};

export default EmployeesPage;