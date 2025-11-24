import React from 'react';

function DetailView({ data }) {
  if (!data) {
    return null;
  }

  // Get all fields from the data object
  const fields = Object.entries(data);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
        <h2 className="text-2xl font-bold">Record Details</h2>
        {data.ID && <p className="text-sm opacity-90 mt-1">ID: {data.ID}</p>}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map(([key, value]) => (
            <div key={key} className="border-b border-gray-200 pb-4">
              <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                {key}
              </dt>
              <dd className="text-base text-gray-900 break-words">
                {value !== null && value !== undefined && value !== '' ? String(value) : (
                  <span className="text-gray-400 italic">Empty</span>
                )}
              </dd>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Total fields: {fields.length}
        </p>
      </div>
    </div>
  );
}

export default DetailView;
