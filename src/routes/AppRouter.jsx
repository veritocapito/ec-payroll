import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import CompaniesPage from '../pages/CompaniesPage.jsx';
import CompanyDetailPage from '../pages/CompanyDetailPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta para el Login, no usa el layout principal */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas que usan el layout principal */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="empresas" element={<CompaniesPage />} />
        <Route path="empresas/:companyId" element={<CompanyDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;