import React from 'react';

function LeftPanel({ isCollapsed, currentPage, onPageChange }) {
  return (
    <aside className={`bg-gray-900 text-gray-100 overflow-y-auto transition-all duration-300 border-r border-gray-800 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="py-4">
        {!isCollapsed && (
          <nav className="px-3">
            <div className="mb-4 px-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h2>
            </div>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => onPageChange('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    currentPage === 'dashboard' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Full VIA</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('fullsell')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    currentPage === 'fullsell' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Tổng Bán</span>
                </button>
              </li>
            </ul>
          </nav>
        )}

        {isCollapsed && (
          <nav className="px-2">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onPageChange('dashboard')}
                  className={`w-full flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                    currentPage === 'dashboard' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  title="Full VIA"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('fullsell')}
                  className={`w-full flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                    currentPage === 'fullsell' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  title="Tổng Bán"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </aside>
  );
}

export default LeftPanel;
