import { Link, useLocation, useParams } from 'react-router-dom';
import Button from '../components/common/Button';

const DetailItem = ({ label, value }) => (
  <div className="py-2">
    <p className="text-sm font-sans font-semibold text-gray-500">{label}</p>
    <p className="text-md text-neutral-dark font-serif">{value || '-'}</p>
  </div>
);

const CompanyDetailPage = () => {
  const location = useLocation();
  const { companyId } = useParams();
  
  // Obtenemos los datos de la empresa pasados por el Link
  const company = location.state?.company;

  if (!company) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold font-sans text-danger">Error</h1>
        <p className="font-serif">No se pudo cargar la información de la empresa.</p>
        <Link to="/companies">
          <Button variant="primary" className="mt-4">Volver al listado</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-sans text-primary">{company.razonSocial}</h1>
          <p className="text-lg text-gray-600 font-serif">Detalles de la Empresa</p>
        </div>
        <div className="flex space-x-4">
          <Link to={`/companies/${companyId}/employees`} state={{ company: company }}>
            <Button variant="primary">Gestionar Empleados</Button>
          </Link>
          <Link to="/companies">
            <Button variant="secondary">← Volver al listado</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Datos Principales */}
        <section>
          <h3 className="text-xl font-sans font-semibold text-primary border-b pb-2 mb-2">Datos Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <DetailItem label="Razón Social" value={company.razonSocial} />
            <DetailItem label="CUIT" value={company.cuit} />
            <DetailItem label="Código" value={company.codigo} />
            <DetailItem label="CUIT Representante ARCA" value={company.cuitRep} />
          </div>
        </section>
        
        {/* Domicilio Legal */}
        <section>
          <h3 className="text-xl font-sans font-semibold text-primary border-b pb-2 mb-2">Domicilio Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
            <DetailItem label="Calle" value={`${company.calle} ${company.numero}`} />
            <DetailItem label="Piso" value={company.piso} />
            <DetailItem label="Departamento" value={company.dpto} />
            <DetailItem label="C. Postal" value={company.cp} />
            <DetailItem label="Localidad" value={company.localidad} />
            <DetailItem label="Provincia" value={company.provincia} />
            <DetailItem label="País" value={company.pais} />
          </div>
        </section>

        {/* Contacto Principal */}
        <section>
           <h3 className="text-xl font-sans font-semibold text-primary border-b pb-2 mb-2">Contacto Principal</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <DetailItem label="Nombre Completo" value={company.contactName} />
            <DetailItem label="Email" value={company.contactEmail} />
            <DetailItem label="Celular" value={company.celular} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyDetailPage;