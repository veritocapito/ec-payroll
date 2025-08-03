import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { CompaniesProvider } from './context/CompaniesContext.jsx';

function App() {
  return (
    <CompaniesProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CompaniesProvider>
  );
}

export default App;
