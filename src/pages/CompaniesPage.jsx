import { useState, useEffect } from 'react';
import { getCompanies } from '../services/companyService.js';
import Table from '../components/common/Table.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Button from '../components/common/Button.jsx';
import Modal from '../components/common/Modal.jsx';
import CompanyForm from '../components/company/CompanyForm.jsx';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]); // El estado de las empresas
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCompanies().then(initialCompanies => {
      setCompanies(initialCompanies);
      setIsLoading(false);
    });
  }, []);

  // Función para agregar una nueva empresa al estado
  const handleAddCompany = (newCompany) => {
    setCompanies(currentCompanies => [...currentCompanies, newCompany]);
  };

  // Nuevas columnas para la tabla
  const columns = [
    { header: 'Razón Social', accessor: 'razonSocial' },
    { header: 'CUIT', accessor: 'cuit' },
    { header: 'Email de Contacto', accessor: 'contactEmail' },
    {
      header: 'Acciones',
      cell: (row) => (
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => console.log('Ver empresa:', row.id)} className="py-1 px-2 text-xs">Ver</Button>
          <Button variant="secondary" onClick={() => console.log('Editar empresa:', row.id)} className="py-1 px-2 text-xs">Editar</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-sans text-primary">Gestión de Empresas</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Agregar Empresa
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {isLoading ? <Spinner /> : <Table columns={columns} data={companies} />}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nueva Empresa">
        {/* Pasamos la función handleAddCompany al formulario */}
        <CompanyForm onClose={() => setIsModalOpen(false)} onAddCompany={handleAddCompany} />
      </Modal>
    </div>
  );
};

export default CompaniesPage;