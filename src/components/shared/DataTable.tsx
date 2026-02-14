interface DataTableProps {
  headers: string[];
  rows: string[][];
}

export default function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full min-w-[400px] border-collapse">
        <thead>
          <tr className="bg-navy-800 text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-navy-100 ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-navy-50"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
