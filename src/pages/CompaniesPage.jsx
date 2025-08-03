import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompanies } from '../hooks/useCompanies.js'; 
import Table from '../components/common/Table.jsx';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';
import CompanyForm from '../components/company/CompanyForm.jsx';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; 

const CompaniesPage = () => {
  // Obtenemos los datos y las funciones directamente del contexto
  const { companies, handleSaveCompany, handleToggleCompanyStatus } = useCompanies();
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [companyToToggle, setCompanyToToggle] = useState(null);

  // Funciones para abrir los modales y preparar los datos
  const handleOpenAddModal = () => {
    setEditingCompany(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (company) => {
    setEditingCompany(company);
    setIsFormModalOpen(true);
  };

  const openConfirmModal = (company) => {
    setCompanyToToggle(company);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmToggle = () => {
    if (companyToToggle) {
      handleToggleCompanyStatus(companyToToggle.id);
      setIsConfirmModalOpen(false);
      setCompanyToToggle(null);
    }
  };
  
  const handleToggleStatusRequest = () => {
    if (editingCompany) {
      setIsFormModalOpen(false);
      openConfirmModal(editingCompany);
    }
  };

  const columns = [
    { header: 'Razón Social', accessor: 'razonSocial' },
    { 
      header: 'CUIT',
      cell: (row) => <span className="whitespace-nowrap">{row.cuit}</span>
    },
    { header: 'Contacto', accessor: 'contactName' },
    { header: 'Email', accessor: 'contactEmail' },
    {
      header: 'Acciones',
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/companies/${row.id}`} state={{ company: row }} title="Ver Empresa">
            <IconButton size="small">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Link>
          <IconButton size="small" onClick={() => handleOpenEditModal(row)} title="Editar Empresa">
            <EditIcon fontSize="small" />
          </IconButton>
          <Link to={`/companies/${row.id}/employees`} state={{ company: row }} title="Ver Nómina">
            <IconButton size="small">
              <PeopleAltIcon fontSize="small" />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">
            Gestión de Empresas
          </h1>
        </div>
        <Button variant="primary" onClick={handleOpenAddModal}>
          + Agregar Empresa
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Table columns={columns} data={companies} />
      </div>
      
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        title={editingCompany ? 'Editar Empresa' : 'Agregar Nueva Empresa'}
      >
        <CompanyForm 
          onClose={() => setIsFormModalOpen(false)} 
          onSave={handleSaveCompany}
          initialData={editingCompany}
          onToggleStatus={handleToggleStatusRequest}
        />
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={`${companyToToggle?.status === 'Activo' ? 'Desactivar' : 'Activar'} Empresa`}
      >
        <div className="font-serif">
          <p>
            ¿Estás seguro de que deseas {companyToToggle?.status === 'Activo' ? 'desactivar' : 'activar'} la empresa 
            <strong className="font-sans text-primary"> "{companyToToggle?.razonSocial}"</strong>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            La información no se borrará y podrás revertir esta acción en cualquier momento.
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancelar</Button>
          <Button 
            variant={companyToToggle?.status === 'Activo' ? 'danger' : 'success'} 
            onClick={handleConfirmToggle}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CompaniesPage;