import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Radio, RadioGroup, FormControlLabel, FormControl, Checkbox } from '@mui/material';

// 1. Definimos el estado por defecto del formulario fuera del componente.
const defaultFormState = {
  lastName: '', firstName: '', cuil: '', dni: '', birthDate: '',
  gender: '', civilStatus: '', nationality: '',
  street: '', streetNumber: '', floor: '', apartment: '', postalCode: '', city: '', province: '',
  cellphone: '', email: '',
  fileNumber: '', hireDate: '', category: '', contractType: '014', salary: '',
  workday: '', healthInsurance: '', unionAffiliate: '', agreements: [],
  paymentMethod: '', bank: '', cbu: '',
  salaryType: 'bruto',
};

const EmployeeForm = ({ onClose, onSave, initialData = null, companyData }) => {
  const [formData, setFormData] = useState(defaultFormState);
  const [isSalaryByAgreement, setIsSalaryByAgreement] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSalaryByAgreement) { setFormData(prev => ({ ...prev, salary: '0.00' })); }
  }, [isSalaryByAgreement]);

  // 2. El useEffect ahora fusiona los datos existentes con la estructura por defecto.
  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultFormState, ...initialData });
    } else {
      setFormData(defaultFormState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAgreementsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, agreements: selectedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const seventeenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

    if (birthDate > seventeenYearsAgo) {
      setError('El empleado debe tener al menos 17 años.');
      return;
    }

    onSave(formData);
    onClose();
  };

  // --- Opciones para los Selects (sin cambios) ---
  const genderOptions = [ { value: 'F', text: 'Femenino' }, { value: 'M', text: 'Masculino' }, { value: 'X', text: 'No Binario' } ];
  const civilStatusOptions = [ { value: 'single', text: 'Soltero/a' }, { value: 'married', text: 'Casado/a' }, { value: 'divorced', text: 'Divorciado/a' }, { value: 'separated', text: 'Separado/a' }, { value: 'civil_union', text: 'Unión Convivencial' } ];
  const contractTypeOptions = [ { value: '001', text: '001 - A tiempo parcial indeterminado' }, { value: '008', text: '008 - A tiempo completo indeterminado' }, { value: '012', text: '012 - Trabajo eventual' }, { value: '014', text: '014 - Nuevo periodo de prueba' }, { value: '021', text: '021 - A tiempo parcial determinado' }, { value: '022', text: '022 - A tiempo completo determinado' }, { value: '024', text: '024 - Personal de la construcción Ley 22250' }, { value: '027', text: '027 - Pasantías Ley 26427' }, { value: '030', text: '030 - Nuevo período de prueba trabajador discapacitado' }, { value: '031', text: '031 - Trabajador discapacitado Art.87 LEY N°24013' }, { value: '049', text: '049 - Directores - empleado SA con Obra Social y LRT' }, { value: '099', text: '099 - LRT' }, { value: '102', text: '102 - Empleado Servicio Eventual en Usuaria DTO 762' } ];
  const workdayOptions = [ { value: 'full_time', text: 'Completa' }, { value: 'part_time_6h', text: 'Parcial 6hs' }, { value: 'half_day', text: 'Media Jornada' } ];
  const yesNoOptions = [ { value: 'yes', text: 'Si' }, { value: 'no', text: 'No' } ];
  const paymentMethodOptions = [ { value: 'cash', text: 'Efectivo' }, { value: 'bank_transfer', text: 'Transferencia Bancaria' } ];
  const provinceOptions = [ { value: 'Buenos Aires', text: 'Buenos Aires' }, { value: 'CABA', text: 'Ciudad Autónoma de Buenos Aires' }, { value: 'Catamarca', text: 'Catamarca' }, { value: 'Chaco', text: 'Chaco' }, { value: 'Chubut', text: 'Chubut' }, { value: 'Córdoba', text: 'Córdoba' }, { value: 'Corrientes', text: 'Corrientes' }, { value: 'Entre Ríos', text: 'Entre Ríos' }, { value: 'Formosa', text: 'Formosa' }, { value: 'Jujuy', text: 'Jujuy' }, { value: 'La Pampa', text: 'La Pampa' }, { value: 'La Rioja', text: 'La Rioja' }, { value: 'Mendoza', text: 'Mendoza' }, { value: 'Misiones', text: 'Misiones' }, { value: 'Neuquén', text: 'Neuquén' }, { value: 'Río Negro', text: 'Río Negro' }, { value: 'Salta', text: 'Salta' }, { value: 'San Juan', text: 'San Juan' }, { value: 'San Luis', text: 'San Luis' }, { value: 'Santa Cruz', text: 'Santa Cruz' }, { value: 'Santa Fe', text: 'Santa Fe' }, { value: 'Santiago del Estero', text: 'Santiago del Estero' }, { value: 'Tierra del Fuego', text: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur' }, { value: 'Tucumán', text: 'Tucumán' } ];
  const allAgreements = [ { value: '108/75', text: 'CCT 108/75 Inst.Med.S/Internacion' }, { value: '130/75', text: 'CCT 130/75 Empleados de Comercio' }, { value: '151/91', text: 'CCT 151/91 Perfumistas' }, { value: '231/94', text: 'CCT 231/94 Panaderos Bs.As.' }, { value: '260/75', text: 'CCT 260/75 Metalúrgicos' }, { value: '272/96', text: 'CCT 272/96 Rama Pastelería' }, { value: '308/75', text: 'CCT 308/75 Viajantes de Comercio' }, { value: '329/00', text: 'CCT 329/00 Rama Servicios Rápidos' }, { value: '389/04', text: 'CCT 389/04 Gastronómicos' }, { value: '40/89', text: 'CCT 40/89 Choferes de Camiones' }, { value: '42/89', text: 'CCT 42/89 Laboratorios' }, { value: '501/07', text: 'CCT 501/07 S.E.T.I.A.' }, { value: '589/10', text: 'CCT 589/10 Encargados de Edificios' }, { value: '614/10', text: 'CCT 614/10 Unión Cortadores' }, { value: '635/2012', text: 'CCT 635/2012 Jardineros' }, { value: '660/13', text: 'CCT 660/13 UECARA' }, { value: '746/17', text: 'CCT 746/17 S.O.I.V.A.' }, { value: '76/75', text: 'CCT 76/75 UOCRA' }, { value: '736/16', text: 'CCT 736/16 UTEDYC' }, { value: 'sin_convenio', text: 'Sin Convenio Colectivo' }, { value: 'otro', text: 'Otro' } ];

  const companyAgreementsOptions = allAgreements.filter(
    agreement => companyData?.convenios?.includes(agreement.value)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <h3 className="text-lg font-sans font-semibold text-primary border-b mb-2">Datos Personales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input label="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} required />
        <Input label="Nombres" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <Input label="CUIL" name="cuil" value={formData.cuil} onChange={handleChange} required />
        <Input label="DNI" name="dni" value={formData.dni} onChange={handleChange} required />
        <Input label="Fecha de Nacimiento" name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" required />
      </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <Select label="Género" name="gender" value={formData.gender} onChange={handleChange} options={genderOptions} />
        <Select label="Estado Civil" name="civilStatus" value={formData.civilStatus} onChange={handleChange} options={civilStatusOptions} />
        <Input label="Nacionalidad" name="nationality" value={formData.nationality} onChange={handleChange} required />
      </div>

      <h3 className="text-lg font-sans font-semibold text-primary border-b mt-4 mb-2">Domicilio y Contacto</h3>
      <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-6"><Input label="Calle" name="street" value={formData.street} onChange={handleChange} required /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Número" name="streetNumber" value={formData.streetNumber} onChange={handleChange} type="text" required /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Piso" name="floor" value={formData.floor} onChange={handleChange} /></div>
          <div className="col-span-4 md:col-span-2"><Input label="Depto" name="apartment" value={formData.apartment} onChange={handleChange} /></div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 mt-4">
        <div className="col-span-6 sm:col-span-3 md:col-span-2"><Input label="C. Postal" name="postalCode" value={formData.postalCode} onChange={handleChange} required maxLength="6" /></div>
        <div className="col-span-6 sm:col-span-4 md:col-span-3"><Select label="Provincia" name="province" value={formData.province} onChange={handleChange} required options={provinceOptions} /></div>
        <div className="col-span-6 sm:col-span-5 md:col-span-4"><Input label="Localidad" name="city" value={formData.city} onChange={handleChange} /></div>
        <div className="col-span-6 sm:col-span-12 md:col-span-3"><Input label="País" name="country" value={formData.country} onChange={handleChange} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input label="Celular" name="cellphone" value={formData.cellphone} onChange={handleChange} type="tel" />
        <Input label="E-mail" name="email" value={formData.email} onChange={handleChange} type="email" required />
      </div>
      
      <h3 className="text-lg font-sans font-semibold text-primary border-b mt-4 mb-2">Datos Laborales</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-4">
        <div className="md:col-span-1"><Input label="Legajo" name="fileNumber" value={formData.fileNumber} onChange={handleChange} required /></div>
        <div className="md:col-span-2"><Input label="Fecha de Ingreso" name="hireDate" value={formData.hireDate} onChange={handleChange} type="date" required /></div>
        <div className="md:col-span-3 md:row-span-2 flex flex-col">
          <Select label="Convenio" name="agreements" value={formData.agreements} onChange={handleAgreementsChange} options={companyAgreementsOptions} required multiple className="flex-grow" />
        </div>
        <div className="md:col-span-3"><Input label="Categoría" name="category" value={formData.category} onChange={handleChange} required /></div>
        <div className="md:col-span-2"><Select label="Jornada" name="workday" value={formData.workday} onChange={handleChange} options={workdayOptions} required /></div>
        <div className="md:col-span-4"><Select label="Modalidad de Contratación" name="contractType" value={formData.contractType} onChange={handleChange} options={contractTypeOptions} required /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 items-center mt-4">
        <Input label="Remuneración Pactada" name="salary" value={formData.salary} onChange={handleChange} type="text" disabled={isSalaryByAgreement} required />
        <div className="flex items-center space-x-4">
          <FormControlLabel control={<Checkbox name="isSalaryByAgreement" checked={isSalaryByAgreement} onChange={(e) => setIsSalaryByAgreement(e.target.checked)} size="small" />} label="Según convenio" className="font-sans"/>
          <FormControl>
            <RadioGroup row name="salaryType" value={formData.salaryType} onChange={handleChange}>
              <FormControlLabel value="bruto" control={<Radio size="small" />} label="Bruto" />
              <FormControlLabel value="neto" control={<Radio size="small" />} label="Neto" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4">
        <Input label="Obra Social" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} required />
        <Select label="Afiliado al Sindicato?" name="unionAffiliate" value={formData.unionAffiliate} onChange={handleChange} options={yesNoOptions} required />
      </div>
      
      <h3 className="text-lg font-sans font-semibold text-primary border-b mt-4 mb-2">Datos Bancarios</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        <div className="md:col-span-1"><Select label="Forma de Pago" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} options={paymentMethodOptions} required /></div>
        <div className="md:col-span-1"><Input label="Banco" name="bank" value={formData.bank} onChange={handleChange} required={formData.paymentMethod === 'bank_transfer'} /></div>
        <div className="md:col-span-1"><Input label="CBU" name="cbu" value={formData.cbu} onChange={handleChange} required={formData.paymentMethod === 'bank_transfer'} /></div>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-sans font-semibold text-primary mb-2">Documentación Adicional</h3>
        <div className="flex space-x-4">
          <Button type="button" variant="secondary">Declaración de Domicilio</Button>
          <Button type="button" variant="secondary">Declaración de Familiares</Button>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 mt-6 border-t">
      {error && <p className="text-sm text-danger font-sans mr-auto">{error}</p>}
        <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button type="submit" variant="primary">Guardar Empleado</Button>
      </div>
    </form>
  );
};

export default EmployeeForm;