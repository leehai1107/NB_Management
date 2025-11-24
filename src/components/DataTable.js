import React, { useState } from 'react';

function DataTable({ data }) {
  const [copiedCell, setCopiedCell] = useState(null);

  if (!data || data.length === 0) {
    return null;
  }

  // Get column headers from the first data object
  const columns = Object.keys(data[0]);

  const copyToClipboard = (text, cellId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCell(cellId);
      setTimeout(() => setCopiedCell(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

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
            {data.map((row, rowIndex) => {
              const isNotFound = row._notFound === true;
              return (
              <tr 
                key={rowIndex} 
                className={`border-b border-gray-200 transition-colors duration-75 ${
                  isNotFound 
                    ? 'bg-red-50 hover:bg-red-100' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {/* Row number - sticky */}
                <td className={`sticky left-0 z-10 border-r-2 border-gray-300 px-4 py-3 text-center text-xs font-semibold shadow-sm ${
                  isNotFound 
                    ? 'bg-red-50 hover:bg-red-100 text-red-700' 
                    : 'bg-white hover:bg-blue-50 text-gray-600'
                }`}>
                  {isNotFound ? '❌' : rowIndex + 1}
                </td>
                {/* Data cells - scroll horizontally */}
                {columns.map((column, colIndex) => {
                  const cellId = `${rowIndex}-${column}`;
                  let cellValue = row[column] !== null && row[column] !== undefined && row[column] !== '' 
                    ? String(row[column]) 
                    : '-';
                  
                  // For not-found rows, show the ID in the 5th column (index 4)
                  if (isNotFound && colIndex === 4 && column !== 'ID') {
                    cellValue = row.ID || '-';
                  }
                  
                  const isCopied = copiedCell === cellId;
                  
                  return (
                    <td 
                      key={cellId} 
                      className={`border-r border-gray-200 px-2 py-2 text-sm whitespace-nowrap group ${
                        isNotFound ? 'text-red-700 font-semibold' : 'text-gray-800'
                      }`}
                      style={{ minWidth: '150px', maxWidth: '400px' }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="overflow-hidden text-ellipsis flex-1" title={cellValue}>
                          {cellValue}
                        </div>
                        <button
                          onClick={() => copyToClipboard(cellValue, cellId)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 flex-shrink-0"
                          title="Copy to clipboard"
                        >
                          {isCopied ? (
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
              );
            })}
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
