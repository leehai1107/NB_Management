import React, { useState } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import DashboardPage from './pages/DashboardPage';
import FullSellPage from './pages/FullSellPage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Dashboard page state
  const [dashboardState, setDashboardState] = useState({
    searchResults: [],
    loading: false,
    error: null,
    idInput: '',
    viewMode: 'list',
    availableSheets: ['FULL_VIA'],
    loadingSheets: true
  });

  // FullSell page state
  const [fullSellState, setFullSellState] = useState({
    searchResults: [],
    loading: false,
    error: null,
    idInput: '',
    viewMode: 'list',
    availableSheets: ['Sheet1'],
    loadingSheets: true
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage state={dashboardState} setState={setDashboardState} />;
      case 'fullsell':
        return <FullSellPage state={fullSellState} setState={setFullSellState} />;
      default:
        return <DashboardPage state={dashboardState} setState={setDashboardState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel 
          isCollapsed={isSidebarCollapsed} 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Main Content Panel */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
