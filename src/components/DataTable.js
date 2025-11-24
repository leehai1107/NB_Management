import React from 'react';

function DataTable({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  // Get column headers from the first data object
  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with row count */}
      <div className="bg-gray-100 border-b-2 border-gray-300 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">
            📊 {data.length} {data.length === 1 ? 'row' : 'rows'}
          </span>
          <span className="text-sm text-gray-500">
            {columns.length} {columns.length === 1 ? 'column' : 'columns'}
          </span>
        </div>
        <span className="text-xs text-gray-500">← Scroll horizontally to view all columns →</span>
      </div>

      {/* Table container with smooth horizontal scroll */}
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] relative">
        <table className="border-collapse" style={{ width: 'max-content', minWidth: '100%' }}>
          {/* Column headers - Google Sheets style */}
          <thead className="sticky top-0 z-20">
            <tr className="bg-gray-100 border-b-2 border-gray-400">
              <th className="sticky left-0 z-30 bg-gray-200 border-r-2 border-gray-400 px-4 py-3 text-center text-xs font-bold text-gray-700 shadow-sm">
                #
              </th>
              {columns.map((column) => (
                <th 
                  key={column} 
                  className="border-r border-gray-300 px-4 py-3 text-left text-xs font-bold text-gray-700 bg-gray-100 whitespace-nowrap"
                  style={{ minWidth: '150px' }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-75"
              >
                {/* Row number - sticky */}
                <td className="sticky left-0 z-10 bg-white hover:bg-blue-50 border-r-2 border-gray-300 px-4 py-3 text-center text-xs font-semibold text-gray-600 shadow-sm">
                  {rowIndex + 1}
                </td>
                {/* Data cells - scroll horizontally */}
                {columns.map((column) => (
                  <td 
                    key={`${rowIndex}-${column}`} 
                    className="border-r border-gray-200 px-4 py-3 text-sm text-gray-800 whitespace-nowrap"
                    style={{ minWidth: '150px', maxWidth: '400px' }}
                  >
                    <div className="overflow-hidden text-ellipsis" title={String(row[column] || '')}>
                      {row[column] !== null && row[column] !== undefined && row[column] !== '' 
                        ? String(row[column]) 
                        : '-'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scroll hint at bottom */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-center">
        <p className="text-xs text-gray-500">
          💡 Tip: Use Shift + Mouse Wheel or trackpad to scroll horizontally
        </p>
      </div>
    </div>
  );
}

export default DataTable;
