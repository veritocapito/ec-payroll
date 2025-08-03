import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// 1. Crear el contexto
const CompaniesContext = createContext();

// Datos iniciales (semilla para localStorage)
const initialCompanies = [
  { id: 1, razonSocial: 'Estudio Contable Diaz', cuit: '30-11223344-5', contactEmail: 'contacto@diaz.com', status: 'Activo', employees: [] },
  { id: 2, razonSocial: 'Constructora del Sur S.A.', cuit: '30-55667788-9', contactEmail: 'admin@constructora.com', status: 'Activo', employees: [] },
];

// 2. Crear el Proveedor del Contexto
export const CompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useLocalStorage('companies', initialCompanies);

  const handleSaveCompany = (companyData) => {
    if (companyData.id) {
      // Lógica de edición
      setCompanies(prev => prev.map(c => c.id === companyData.id ? { ...c, ...companyData } : c));
    } else {
      // Lógica de creación
      setCompanies(prev => [...prev, { ...companyData, id: Date.now(), status: 'Activo', employees: [] }]);
    }
  };

  const handleToggleCompanyStatus = (companyId) => {
    setCompanies(prev =>
      prev.map(c =>
        c.id === companyId ? { ...c, status: c.status === 'Activo' ? 'Inactivo' : 'Activo' } : c
      )
    );
  };
  
  const handleSaveEmployee = (companyId, employeeData) => {
    setCompanies(prevCompanies => {
      return prevCompanies.map(c => {
        if (c.id === companyId) {
          let updatedEmployees;
          if (employeeData.id) { // Si el empleado tiene ID, es una edición
            updatedEmployees = c.employees.map(emp => emp.id === employeeData.id ? { ...emp, ...employeeData } : emp);
          } else { // Si no, es uno nuevo
            const newEmployee = { ...employeeData, id: Date.now(), status: 'Activo' };
            updatedEmployees = [...(c.employees || []), newEmployee];
          }
          return { ...c, employees: updatedEmployees };
        }
        return c;
      });
    });
  };

  // El valor que compartiremos con toda la app
  const value = {
    companies,
    handleSaveCompany,
    handleToggleCompanyStatus,
    handleSaveEmployee,
  };

  return (
    <CompaniesContext.Provider value={value}>
      {children}
    </CompaniesContext.Provider>
  );
};

// 3. Crear un hook personalizado para consumir el contexto fácilmente
export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};
