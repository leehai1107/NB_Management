import React, { useState } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel isCollapsed={isSidebarCollapsed} />

        {/* Main Content Panel */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default App;
