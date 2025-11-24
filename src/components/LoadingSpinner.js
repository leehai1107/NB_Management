import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-12">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading data...</p>
    </div>
  );
}

export default LoadingSpinner;
