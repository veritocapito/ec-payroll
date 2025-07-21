import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../components/common/Button';

// Componente reutilizado para mostrar un item de detalle
const DetailItem = ({ label, value }) => (
  <div className="py-2">
    <p className="text-sm font-sans font-semibold text-gray-500">{label}</p>
    <p className="text-md text-neutral-dark font-serif">{value || '-'}</p>
  </div>
);

const EmployeeDetailPage = () => {
  const location = useLocation();
  const { companyId } = useParams();
  
  // Obtenemos los datos del empleado pasados por el Link
  const employee = location.state?.employee;
  const company = location.state?.company;

  if (!employee || !company) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold font-sans text-danger">Error</h1>
        <p className="font-serif">No se pudo cargar la información.</p>
        <Link to="/companies">
          <Button variant="primary" className="mt-4">Volver a Empresas</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">{employee.nombres} {employee.apellido}</h1>
          <p className="text-lg text-gray-600 font-serif">Legajo #{employee.legajo} | {company.razonSocial}</p>
        </div>
        <Link to={`/companies/${companyId}/employees`} state={{ company }}>
          <Button variant="secondary">← Volver a la Nómina</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Aquí puedes agregar todas las secciones de detalle que necesites */}
        <section>
          <h3 className="text-xl font-sans font-semibold text-primary border-b pb-2 mb-2">Datos Personales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <DetailItem label="CUIL" value={employee.cuil} />
            <DetailItem label="DNI" value={employee.dni} />
            <DetailItem label="Fecha de Nacimiento" value={employee.fechaNacimiento} />
          </div>
        </section>
        <section>
          <h3 className="text-xl font-sans font-semibold text-primary border-b pb-2 mb-2">Datos Laborales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <DetailItem label="Fecha de Ingreso" value={employee.fechaIngreso} />
            <DetailItem label="Categoría" value={employee.categoria} />
            <DetailItem label="Jornada" value={employee.jornada} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;