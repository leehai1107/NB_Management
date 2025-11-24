import React, { useState } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import DashboardPage from './pages/DashboardPage';
import FullSellPage from './pages/FullSellPage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'fullsell':
        return <FullSellPage />;
      default:
        return <DashboardPage />;
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
