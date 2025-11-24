import React, { useEffect } from 'react';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchTongBanData, fetchTongBanSheetNames } from '../services/googleSheets_TongBan';

function FullSellPage({ state, setState }) {
  const { searchResults, loading, error, idInput, viewMode, availableSheets, loadingSheets } = state;
  
  const setSearchResults = (value) => setState(prev => ({ ...prev, searchResults: value }));
  const setLoading = (value) => setState(prev => ({ ...prev, loading: value }));
  const setError = (value) => setState(prev => ({ ...prev, error: value }));
  const setIdInput = (value) => setState(prev => ({ ...prev, idInput: value }));
  const setViewMode = (value) => setState(prev => ({ ...prev, viewMode: value }));
  const setAvailableSheets = (value) => setState(prev => ({ ...prev, availableSheets: value }));
  const setLoadingSheets = (value) => setState(prev => ({ ...prev, loadingSheets: value }));

  // Fetch sheet names on component mount
  useEffect(() => {
    const loadSheetNames = async () => {
      try {
        setLoadingSheets(true);
        const sheetNames = await fetchTongBanSheetNames();
        if (sheetNames.length > 0) {
          setAvailableSheets(sheetNames);
        }
      } catch (err) {
        console.error('Failed to load sheet names:', err);
        setAvailableSheets(['Sheet1']);
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
      
      // Search across all available sheets IN PARALLEL
      const searchPromises = availableSheets.map(async (sheet) => {
        try {
          const sheetData = await fetchTongBanData(sheet);
          const foundInSheet = sheetData.filter(item => 
            ids.some(id => {
              // Search in ALL columns for the ID value
              return Object.values(item).some(value => 
                String(value) === String(id)
              );
            })
          );
          
          if (foundInSheet.length > 0) {
            // Add sheet name to each record for reference
            const recordsWithSheet = foundInSheet.map(record => ({
              ...record,
              _sheetName: sheet
            }));
            return { sheet, records: recordsWithSheet };
          }
          return { sheet, records: [] };
        } catch (err) {
          console.error(`Error searching sheet ${sheet}:`, err);
          return { sheet, records: [] };
        }
      });

      // Wait for all searches to complete simultaneously
      const results = await Promise.all(searchPromises);
      
      // Collect all found records
      let allFoundRecords = [];
      let searchedSheets = [];
      
      results.forEach(result => {
        if (result.records.length > 0) {
          allFoundRecords.push(...result.records);
          searchedSheets.push(result.sheet);
        }
      });
      
      // Find IDs that were not found - check all record values
      const foundIds = new Set();
      allFoundRecords.forEach(record => {
        Object.values(record).forEach(value => {
          if (value && ids.includes(String(value))) {
            foundIds.add(String(value));
          }
        });
      });
      const notFoundIds = ids.filter(id => !foundIds.has(String(id)));
      
      // Add not-found IDs as special records
      const notFoundRecords = notFoundIds.map(id => ({
        ID: id,
        _notFound: true,
        _sheetName: 'Not Found'
      }));
      
      const allRecords = [...allFoundRecords, ...notFoundRecords];
      
      if (allFoundRecords.length === 0) {
        setError(`No data found for ID(s): ${ids.join(', ')} across ${availableSheets.length} sheet(s)`);
        setSearchResults(allRecords);
        setViewMode('search');
      } else {
        setSearchResults(allRecords);
        setViewMode('search');
        const message = notFoundIds.length > 0 
          ? `${notFoundIds.length} ID(s) không phải nhà mình: ${notFoundIds.join(', ')}`
          : `Found ${allFoundRecords.length} record(s) in ${searchedSheets.length} sheet(s): ${searchedSheets.join(', ')}`;
        if (notFoundIds.length > 0) {
          setError(message);
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
        
        {/* Search Controls */}
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={fetchDataByIdHandler}
            disabled={loading || loadingSheets}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : loadingSheets ? 'Please wait...' : 'Search All Sheets'}
          </button>
          
          {viewMode === 'search' && (
            <button
              onClick={() => {
                setViewMode('list');
                setSearchResults([]);
                setIdInput('');
                setError(null);
              }}
              className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
          
          {loadingSheets && (
            <span className="text-sm text-gray-500">⏳ Loading sheet names, please wait...</span>
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

export default FullSellPage;
