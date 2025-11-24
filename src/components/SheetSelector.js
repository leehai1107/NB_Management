import React from 'react';

function SheetSelector({ sheets, selectedSheet, onSheetChange, onSearch, loading, showClearButton, onClear }) {
  return (
    <div className="flex items-end gap-4 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="sheetSelector" className="block text-sm font-semibold text-gray-700 mb-2">
          Select Sheet
        </label>
        <select
          id="sheetSelector"
          value={selectedSheet}
          onChange={(e) => onSheetChange(e.target.value)}
          className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-white cursor-pointer"
        >
          {sheets.map((sheet) => (
            <option key={sheet} value={sheet}>
              {sheet}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0" 
        onClick={onSearch}
        disabled={loading}
      >
        Search by ID(s)
      </button>
      
      {showClearButton && (
        <button 
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200" 
          onClick={onClear}
        >
          Clear Search
        </button>
      )}
    </div>
  );
}

export default SheetSelector;
