import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import CompaniesPage from '../pages/CompaniesPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta para el Login, no usa el layout principal */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas que SÍ usan el layout principal (Navbar, Sidebar, etc.) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="empresas" element={<CompaniesPage />} />
        {/* Aquí agregarás más rutas en el futuro (ej: concepts, reports) */}
      </Route>

      {/* Podrías agregar una ruta para "Página no encontrada" */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRouter;