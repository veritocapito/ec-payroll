import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CompanyForm = ({ onClose, onAddCompany }) => {
  // Estado inicial para todos los campos del formulario
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    codigo: '',
    cuitRep: '',
    claveArca: '',
    calle: '',
    numero: '',
    piso: '',
    dpto: '',
    cp: '',
    provincia: '',
    localidad: '',
    pais: '',
    convenios: [],
    medioDePago: '',
    contactName: '',
    contactEmail: '',
    celular: '',
  });

  // Función genérica que actualiza el estado para la mayoría de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función específica para el select múltiple de convenios
  const handleConveniosChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, convenios: selectedOptions }));
  };

  // Al enviar, pasamos los datos al componente padre y cerramos el modal
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany({ id: Date.now(), ...formData }); // Añadimos un ID único
    onClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const conveniosOptions = [
    { value: '108/75', text: 'CCT 108/75 Inst.Med.S/Internacion' },
    { value: '130/75', text: 'CCT 130/75 Empleados de Comercio' },
    { value: '151/91', text: 'CCT 151/91 Perfumistas' },
    { value: '231/94', text: 'CCT 231/94 Panaderos Bs.As.' },
    { value: '260/75', text: 'CCT 260/75 Metalúrgicos' },
    { value: '272/96', text: 'CCT 272/96 Rama Pastelería' },
    { value: '308/75', text: 'CCT 308/75 Viajantes de Comercio' },
    { value: '329/00', text: 'CCT 329/00 Rama Servicios Rápidos' },
    { value: '389/04', text: 'CCT 389/04 Gastronómicos' },
    { value: '40/89', text: 'CCT 40/89 Choferes de Camiones' },
    { value: '42/89', text: 'CCT 42/89 Laboratorios' },
    { value: '501/07', text: 'CCT 501/07 S.E.T.I.A.' },
    { value: '589/10', text: 'CCT 589/10 Encargados de Edificios' },
    { value: '614/10', text: 'CCT 614/10 Unión Cortadores' },
    { value: '635/2012', text: 'CCT 635/2012 Jardineros' },
    { value: '660/13', text: 'CCT 660/13 UECARA' },
    { value: '746/17', text: 'CCT 746/17 S.O.I.V.A.' },
    { value: '76/75', text: 'CCT 76/75 UOCRA' },
    { value: '736/16', text: 'CCT 736/16 UTEDYC' },
    { value: 'sin_convenio', text: 'Sin Convenio Colectivo' },
    { value: 'otro', text: 'Otro' },
  ];

  const medioDePagoOptions = [
    { value: 'pago_mis_cuentas', text: 'PagoMisCuentas' },
    { value: 'red_link', text: 'RedLink' },
    { value: 'interbanking', text: 'Interbanking' },
    { value: 'qr', text: 'Pago con QR' },
    { value: 'xn_group', text: 'XN Group' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* --- DATOS PRINCIPALES --- */}
      <h3 className="text-lg font-sans font-semibold text-primary border-b mb-2">Datos Principales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input label="Razón Social" id="razonSocial" name="razonSocial" value={formData.razonSocial} onChange={handleChange} required />
        <Input label="CUIT" id="cuit" name="cuit" value={formData.cuit} onChange={handleChange} placeholder="XX-XXXXXXXX-X" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <Input label="Código" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} />
        <Input label="CUIT Representante ARCA" id="cuitRep" name="cuitRep" value={formData.cuitRep} onChange={handleChange} required />
       <Input
          label="Clave Fiscal ARCA"
          id="claveArca"
          name="claveArca"
          value={formData.claveArca}
          onChange={handleChange}
          required
          type={showPassword ? 'text' : 'password'} // Tipo dinámico
          onEndIconClick={handleTogglePassword}     // Acción al hacer clic en el icono
          endIcon={showPassword ? <VisibilityOff /> : <Visibility />} // Icono dinámico
        />
      </div>
      
      {/* --- DOMICILIO LEGAL --- */}
      <div className="mt-4">
        <h3 className="text-lg font-sans font-semibold text-primary border-b mb-2">Domicilio Legal</h3>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-6"><Input label="Calle" id="calle" name="calle" value={formData.calle} onChange={handleChange} required /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Número" id="numero" name="numero" value={formData.numero} onChange={handleChange} type="text" required /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Piso" id="piso" name="piso" value={formData.piso} onChange={handleChange} /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Depto" id="dpto" name="dpto" value={formData.dpto} onChange={handleChange} /></div>
        </div>
        <div className="grid grid-cols-12 gap-x-6 mt-4">
          <div className="col-span-6 sm:col-span-3 md:col-span-2"><Input label="C. Postal" id="cp" name="cp" value={formData.cp} onChange={handleChange} required maxLength="6" /></div>
          <div className="col-span-6 sm:col-span-4 md:col-span-3"><Input label="Provincia" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} required /></div>
          <div className="col-span-6 sm:col-span-5 md:col-span-4"><Input label="Localidad" id="localidad" name="localidad" value={formData.localidad} onChange={handleChange} /></div>
          <div className="col-span-6 sm:col-span-12 md:col-span-3"><Input label="País" id="pais" name="pais" value={formData.pais} onChange={handleChange} /></div>
        </div>
      </div>

      {/* --- DATOS LABORALES --- */}
      <div className="mt-4">
        <h3 className="text-lg font-sans font-semibold text-primary border-b mb-2">Datos Laborales</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Select label="Convenios Aplicables" id="convenios" name="convenios" value={formData.convenios} onChange={handleConveniosChange} required multiple options={conveniosOptions} />
        <Select label="Medio de Pago (Veps)" id="medioDePago" name="medioDePago" value={formData.medioDeago} onChange={handleChange} required options={medioDePagoOptions} />
      </div>

      {/* --- CONTACTO PRINCIPAL --- */}
      <div className="mt-4">
        <h3 className="text-lg font-sans font-semibold text-primary border-b mb-2">Contacto Principal</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <Input label="Nombre Completo" id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required />
        <Input label="Email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" required />
        <Input label="Celular" id="celular" name="celular" value={formData.celular} onChange={handleChange} type="tel" required />
      </div>

      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="flex justify-end space-x-4 pt-4 mt-6 border-t">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Guardar Empresa
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;