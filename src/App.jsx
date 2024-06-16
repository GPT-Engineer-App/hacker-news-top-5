import React, { useState } from 'react';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hacker News Stories</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <main className="p-4">
          <p>Content goes here...</p>
        </main>
      </div>
    </div>
  );
}

export default App;