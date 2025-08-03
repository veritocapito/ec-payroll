import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// 1. Crear el contexto
export const CompaniesContext = createContext();

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
          if (employeeData.id) { // Edición
            updatedEmployees = c.employees.map(emp => emp.id === employeeData.id ? { ...emp, ...employeeData } : emp);
          } else { // Creación
            const newEmployee = { 
              ...employeeData,
              id: Date.now(),
              status: 'Activo',
              workPeriods: [{
                hireDate: employeeData.hireDate,
                terminationDate: null,
                terminationReason: null,
                documentation: null,
              }]
            };
            updatedEmployees = [...(c.employees || []), newEmployee];
          }
          return { ...c, employees: updatedEmployees };
        }
        return c;
      });
    });
  };

  const handleTerminateEmployee = (companyId, employeeId, terminationData) => {
    setCompanies(prevCompanies => {
      return prevCompanies.map(c => {
        if (c.id === companyId) {
          const updatedEmployees = c.employees.map(emp => {
            if (emp.id === employeeId) {
              // Actualizamos el último período de trabajo
              const lastPeriodIndex = emp.workPeriods.length - 1;
              const updatedPeriods = [...emp.workPeriods];
              updatedPeriods[lastPeriodIndex] = {
                ...updatedPeriods[lastPeriodIndex],
                terminationDate: terminationData.terminationDate,
                terminationReason: terminationData.terminationReason,
                documentation: terminationData.documentation?.name || null, // Guardamos solo el nombre del archivo
              };
              // Cambiamos el estado general del empleado
              return { ...emp, status: 'Terminated', workPeriods: updatedPeriods };
            }
            return emp;
          });
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
    handleTerminateEmployee,
  };

  return (
    <CompaniesContext.Provider value={value}>
      {children}
    </CompaniesContext.Provider>
  );
};
