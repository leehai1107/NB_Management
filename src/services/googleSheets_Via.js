const GOOGLE_SHEET_API_URL = process.env.REACT_APP_GOOGLE_SHEET_API_URL;

export const fetchAllData = async (sheetName = 'FULL_VIA') => {
  try {
    const response = await fetch(`${GOOGLE_SHEET_API_URL}?path=${sheetName}&action=read`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }
    
    const result = await response.json();
    
    // Based on Code.gs, the response structure is: { debugInfo, data: jsonData }
    // The data property contains the actual array
    const data = result.data || result;
    
    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error('Unexpected data format:', result);
      throw new Error('Data is not in expected format');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchDataById = async (id, sheetName = 'FULL_VIA') => {
  try {
    const allData = await fetchAllData(sheetName);
    
    // Ensure allData is an array before using find
    if (!Array.isArray(allData)) {
      throw new Error('Data is not in the correct format');
    }
    
    // Find the record with matching ID
    const record = allData.find(item => 
      item.ID === id || 
      item.ID === String(id) || 
      String(item.ID) === String(id)
    );
    
    if (!record) {
      throw new Error(`No data found for ID: ${id}`);
    }
    
    return record;
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    throw error;
  }
};

export const fetchSheetNames = async () => {
  try {
    const response = await fetch(`${GOOGLE_SHEET_API_URL}?action=getSheets`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet names');
    }
    
    const result = await response.json();
    const sheetNames = result.data || result;
    
    if (!Array.isArray(sheetNames)) {
      console.error('Unexpected sheet names format:', result);
      throw new Error('Sheet names not in expected format');
    }
    
    return sheetNames;
  } catch (error) {
    console.error('Error fetching sheet names:', error);
    throw error;
  }
};

export const writeToSheet = async (data, sheetName = 'FULL_VIA') => {
  try {
    // Build query string from data object
    const queryParams = new URLSearchParams({
      path: sheetName,
      action: 'write',
      ...data
    });
    
    const response = await fetch(`${GOOGLE_SHEET_API_URL}?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to write data to Google Sheets');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
};
