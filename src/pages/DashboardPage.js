import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import SheetSelector from '../components/SheetSelector';
import { fetchAllData, fetchSheetNames } from '../services/googleSheets_Via';

function DashboardPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idInput, setIdInput] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'search'
  const [selectedSheet, setSelectedSheet] = useState('FULL_VIA');
  const [availableSheets, setAvailableSheets] = useState(['FULL_VIA']);
  const [loadingSheets, setLoadingSheets] = useState(true);

  // Fetch sheet names on component mount
  useEffect(() => {
    const loadSheetNames = async () => {
      try {
        setLoadingSheets(true);
        const sheetNames = await fetchSheetNames();
        if (sheetNames.length > 0) {
          setAvailableSheets(sheetNames);
          setSelectedSheet(sheetNames[0]); // Set first sheet as default
        }
      } catch (err) {
        console.error('Failed to load sheet names:', err);
        // Keep default sheets if API call fails
        setAvailableSheets(['FULL_VIA']);
      } finally {
        setLoadingSheets(false);
      }
    };

    loadSheetNames();
  }, []);

  const fetchDataByIdHandler = async () => {
    if (!idInput.trim()) {
      setError('Please enter ID(s)');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Split by comma, space, or newline to support multiple IDs
      const ids = idInput
        .split(/[\s,\n]+/)
        .map(id => id.trim())
        .filter(id => id !== '');
      
      const allData = await fetchAllData(selectedSheet);
      
      // Find all matching records
      const foundRecords = allData.filter(item => 
        ids.some(id => 
          String(item.ID) === String(id) || 
          item.ID === id
        )
      );
      
      if (foundRecords.length === 0) {
        setError(`No data found for ID(s): ${ids.join(', ')}`);
        setViewMode('list');
      } else {
        setSearchResults(foundRecords);
        setViewMode('search');
        if (foundRecords.length < ids.length) {
          setError(`Found ${foundRecords.length} of ${ids.length} IDs`);
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch data by ID');
      setLoading(false);
      setViewMode('list');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search by ID Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search by ID(s)</h2>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[250px]">
            <label htmlFor="idInput" className="block text-sm font-medium text-gray-700 mb-2">
              Enter ID(s) - Multiple IDs separated by comma or space
            </label>
            <textarea
              id="idInput"
              rows="2"
              placeholder="Enter one or more IDs (e.g., 123, 456, 789 or one per line)"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && fetchDataByIdHandler()}
              className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Tip: Press Ctrl+Enter to search</p>
          </div>
        </div>
        
        {/* Sheet Selector with Buttons */}
        <div className="mt-4">
          {loadingSheets ? (
            <div className="p-2">
              <p className="text-gray-600 text-sm">Loading sheets...</p>
            </div>
          ) : (
            <SheetSelector 
              sheets={availableSheets}
              selectedSheet={selectedSheet}
              onSheetChange={(sheet) => {
                setSelectedSheet(sheet);
                setSearchResults([]);
                setViewMode('list');
                setError(null);
              }}
              onSearch={fetchDataByIdHandler}
              loading={loading}
              showClearButton={viewMode === 'search'}
              onClear={() => {
                setViewMode('list');
                setSearchResults([]);
                setIdInput('');
                setError(null);
              }}
            />
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {!loading && viewMode === 'search' && searchResults.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <span className="text-green-700 font-semibold">
              ✓ Found {searchResults.length} {searchResults.length === 1 ? 'record' : 'records'}
            </span>
          </div>
          <DataTable data={searchResults} />
        </div>
      )}

      {!loading && viewMode === 'list' && searchResults.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">Enter ID(s) above to search for records.</p>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
