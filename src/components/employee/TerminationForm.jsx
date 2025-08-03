import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const TerminationForm = ({ onClose, onConfirm }) => {
  const [terminationData, setTerminationData] = useState({
    terminationDate: '',
    terminationReason: '',
    documentation: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTerminationData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTerminationData(prev => ({ ...prev, documentation: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(terminationData);
  };

  const terminationReasonOptions = [
    { value: 'job_abandonment', text: 'ABANDONO DEL TRABAJO/ ART.244 LCT' },
    { value: 'employer_termination', text: 'DENUNCIA DE CONTRATO DE TRABAJO POR EL EMPLEADOR/ ART.242 LCT' },
    { value: 'employee_termination', text: 'DENUNCIA DE CONTRATO DE TRABAJO POR EL TRABAJADOR/ ART.242 LCT' },
    { value: 'dismissal_with_cause', text: 'DESPIDO CON CAUSA' },
    { value: 'dismissal_force_majeure', text: 'DESPIDO FUERZA MAYOR ART 247 LCT' },
    { value: 'dismissal_without_cause', text: 'DESPIDO SIN CAUSA ART 245 LCT' },
    { value: 'end_of_internship', text: 'FIN CONTRATO DE APRENDIZAJE Y PASANTIAS' },
    { value: 'other_causes', text: 'OTRAS CAUSALES (Fin Periodo de Prueba, Otros motivos)' },
    { value: 'resignation', text: 'RENUNCIA DEL TRABAJADOR ART 240 LCT' },
    { value: 'contract_transfer', text: 'TRANSFERENCIA CONTRATO DEL TRABAJO ART 225 LCT' },
    { value: 'mutual_agreement', text: 'VOLUNTAD CONCURRENTE DE LAS PARTES / ART. 241- LCT' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Fecha de Egreso"
        name="terminationDate"
        type="date"
        value={terminationData.terminationDate}
        onChange={handleChange}
        required
      />
      <Select
        label="Motivo de Baja"
        name="terminationReason"
        value={terminationData.terminationReason}
        onChange={handleChange}
        options={terminationReasonOptions}
        required
      />
      <Input
        label="Documentación Respaldatoria (Opcional)"
        name="documentation"
        type="file"
        onChange={handleFileChange}
      />
      <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="danger">
          Confirmar Baja
        </Button>
      </div>
    </form>
  );
};

export default TerminationForm;