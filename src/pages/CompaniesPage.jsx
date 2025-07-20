import { useState, useEffect } from 'react';
import { getCompanies } from '../services/companyService.js';
import Table from '../components/common/Table.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';
import CompanyForm from '../components/company/CompanyForm.jsx';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [companyToToggle, setCompanyToToggle] = useState(null);

  useEffect(() => {
    // Para esta simulación, vamos a cargar datos de ejemplo.
    // En una app real, esto vendría de una API.
    const mockCompanies = [
        { id: 1, razonSocial: 'Estudio Contable Diaz', cuit: '30-11223344-5', contactEmail: 'contacto@diaz.com', status: 'Activo' },
        { id: 2, razonSocial: 'Constructora del Sur S.A.', cuit: '30-55667788-9', contactEmail: 'admin@constructora.com', status: 'Activo' },
    ];
    setCompanies(mockCompanies);
    setIsLoading(false);
  }, []);

  const handleOpenAddModal = () => {
    setEditingCompany(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (company) => {
    setEditingCompany(company);
    setIsFormModalOpen(true);
  };

  const handleSaveCompany = (companyData) => {
    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? { ...c, ...companyData } : c));
    } else {
      setCompanies(prev => [...prev, { ...companyData, id: Date.now(), status: 'Activo' }]);
    }
  };

  const openConfirmModal = (company) => {
    setCompanyToToggle(company);
    setIsConfirmModalOpen(true);
  };

  const handleToggleStatus = () => {
    if (companyToToggle) {
      setCompanies(prev =>
        prev.map(c =>
          c.id === companyToToggle.id
            ? { ...c, status: c.status === 'Activo' ? 'Inactivo' : 'Activo' }
            : c
        )
      );
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
    { header: 'CUIT', accessor: 'cuit' },
    { header: 'Email de Contacto', accessor: 'contactEmail' },
    {
      header: 'Acciones',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => console.log('Ver empresa:', row.id)} className="py-1 px-2 text-xs">Ver</Button>
          <Button variant="secondary" onClick={() => handleOpenEditModal(row)} className="py-1 px-2 text-xs">Editar</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-sans text-primary">
          Gestión de Empresas
        </h1>
        <Button variant="primary" onClick={handleOpenAddModal}>
          + Agregar Empresa
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {isLoading ? <Spinner /> : <Table columns={columns} data={companies} />}
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
            variant={companyToToggle?.status === 'Activo' ? 'secondary' : 'success'} 
            onClick={handleToggleStatus}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CompaniesPage;