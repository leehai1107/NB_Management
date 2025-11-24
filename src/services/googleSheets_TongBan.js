const GOOGLE_SHEET_TONGBAN_API_URL = process.env.REACT_APP_GOOGLE_SHEET_TONGBAN_API_URL;

export const fetchTongBanData = async (sheetName = 'Sheet1') => {
  if (!GOOGLE_SHEET_TONGBAN_API_URL) {
    throw new Error('REACT_APP_GOOGLE_SHEET_TONGBAN_API_URL is not configured. Please restart the app.');
  }
  
  try {
    const response = await fetch(`${GOOGLE_SHEET_TONGBAN_API_URL}?path=${sheetName}&action=read`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Tổng Bán Google Sheets');
    }
    
    const result = await response.json();
    const data = result.data || result;
    
    if (!Array.isArray(data)) {
      console.error('Unexpected data format:', result);
      throw new Error('Data is not in expected format');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching Tổng Bán data:', error);
    throw error;
  }
};

export const fetchTongBanSheetNames = async () => {
  if (!GOOGLE_SHEET_TONGBAN_API_URL) {
    return ['Sheet1'];
  }
  
  try {
    const response = await fetch(`${GOOGLE_SHEET_TONGBAN_API_URL}?action=getSheets`);
    
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
    console.error('Error fetching sheet names:', error);
    return ['Sheet1'];
  }
};

export const fetchTongBanDataById = async (id, sheetName = 'Sheet1') => {
  try {
    const allData = await fetchTongBanData(sheetName);
    
    if (!Array.isArray(allData)) {
      throw new Error('Data is not in the correct format');
    }
    
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
