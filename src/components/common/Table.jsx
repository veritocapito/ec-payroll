const Table = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 font-serif">No hay datos para mostrar.</p>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-neutral-dark">
        <thead className="text-xs text-primary uppercase bg-slate-200 font-sans">
          <tr>
            {columns.map((col) => (
              <th key={col.header} scope="col" className="py-3 px-6">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-serif">
          {data.map((row) => (
            <tr key={row.id} className="bg-white border-b hover:bg-neutral-light">
              {columns.map((col) => (
                <td key={`${row.id}-${col.accessor}`} className="py-4 px-6">
                  {/* Si la columna tiene un 'cell' renderer, lo usamos. Si no, mostramos el dato. */}
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;