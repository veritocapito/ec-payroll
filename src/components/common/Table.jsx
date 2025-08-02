const Table = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 font-serif">No hay datos para mostrar.</p>;
  }

  return (
    <>
      {/* Vista de Tabla para Tablets y Escritorio */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-neutral-dark">
            <thead className="text-xs text-primary uppercase bg-slate-200 font-sans">
              <tr>
                {columns.map((col) => (
                  <th key={col.header} scope="col" className="py-3 px-6">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-serif">
              {data.map((row) => (
                <tr key={row.id} className={`border-b hover:bg-neutral-light transition-colors ${row.status !== 'Activo' ? 'bg-slate-50 opacity-60' : 'bg-white'}`}>
                  {columns.map((col) => (
                    <td key={`${row.id}-${col.accessor}`} className="py-4 px-6">
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Vista de Tarjetas para Móvil */}
      <div className="block sm:hidden space-y-4">
        {data.map((row) => (
          <div key={row.id} className={`bg-white p-4 rounded-lg shadow-md border ${row.status === 'Inactivo' ? 'opacity-60' : ''}`}>
            {columns.map((col) => (
              <div key={col.header} className="flex justify-between py-1 border-b last:border-b-0">
                <span className="font-sans font-bold text-sm text-gray-600">{col.header}:</span>
                <span className="text-right font-serif text-sm">
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;