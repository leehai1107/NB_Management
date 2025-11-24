import React from 'react';

function LeftPanel({ isCollapsed }) {
  return (
    <aside className={`bg-gray-800 text-gray-100 overflow-y-auto transition-all duration-300 border-r border-gray-800 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="py-4">
        {!isCollapsed && (
          <nav className="px-3">
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Full VIA</span>
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
                  className="w-full flex items-center justify-center p-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  title="Dashboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
