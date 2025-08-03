import { useContext } from 'react';
import { CompaniesContext } from '../context/CompaniesContext.jsx';

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};