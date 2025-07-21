import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import CompaniesPage from '../pages/CompaniesPage.jsx';
import CompanyDetailPage from '../pages/CompanyDetailPage.jsx';
import EmployeesPage from '../pages/EmployeesPage.jsx';
import EmployeeDetailPage from '../pages/EmployeeDetailPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta para el Login, no usa el layout principal */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas que usan el layout principal */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="companies">
          <Route index element={<CompaniesPage />} />
          <Route path=":companyId" element={<CompanyDetailPage />} />
          <Route path=":companyId/employees" element={<EmployeesPage />} />
           <Route path=":companyId/employees/:employeeId" element={<EmployeeDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;