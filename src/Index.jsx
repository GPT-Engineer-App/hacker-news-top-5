import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './index.css';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(data => {
        const top5Ids = data.slice(0, 5);
        return Promise.all(top5Ids.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        ));
      })
      .then(stories => setStories(stories));
  }, []);

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-xl font-bold">Hacker News Top Stories</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>
        <main className="p-4">
          <input 
            type="text" 
            placeholder="Search stories..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <ul>
            {filteredStories.map(story => (
              <li key={story.id} className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
                <h2 className="text-lg font-semibold">{story.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upvotes: {story.score}</p>
                <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300">Read more</a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Index;