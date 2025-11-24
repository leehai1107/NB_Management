const GOOGLE_SHEET_QLBM_API_URL = process.env.REACT_APP_GOOGLE_SHEET_QLBM_API_URL;

export const fetchQLBMData = async (sheetName = 'Sheet1') => {
  if (!GOOGLE_SHEET_QLBM_API_URL) {
    throw new Error('REACT_APP_GOOGLE_SHEET_QLBM_API_URL is not configured. Please restart the app.');
  }
  
  try {
    const response = await fetch(`${GOOGLE_SHEET_QLBM_API_URL}?path=${sheetName}&action=read`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from QLBM Google Sheets');
    }
    
    const result = await response.json();
    const data = result.data || result;
    
    if (!Array.isArray(data)) {
      console.error('Unexpected data format:', result);
      throw new Error('Data is not in expected format');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching QLBM data:', error);
    throw error;
  }
};

export const fetchQLBMSheetNames = async () => {
  if (!GOOGLE_SHEET_QLBM_API_URL) {
    return ['Sheet1'];
  }
  
  try {
    const response = await fetch(`${GOOGLE_SHEET_QLBM_API_URL}?action=getSheets`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet names');
    }
    
    const result = await response.json();
    const sheetNames = result.data || result;
    
    if (!Array.isArray(sheetNames)) {
      console.error('Unexpected sheet names format:', result);
      return ['Sheet1'];
    }
    
    return sheetNames;
  } catch (error) {
    console.error('Error fetching QLBM sheet names:', error);
    return ['Sheet1'];
  }
};

export const createQLBMRecord = async (data) => {
  if (!GOOGLE_SHEET_QLBM_API_URL) {
    throw new Error('REACT_APP_GOOGLE_SHEET_QLBM_API_URL is not configured');
  }

  try {
    const response = await fetch(GOOGLE_SHEET_QLBM_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'create', data }),
    });

    return { success: true, message: 'Record created successfully' };
  } catch (error) {
    console.error('Error creating QLBM record:', error);
    throw error;
  }
};
