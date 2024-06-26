import React, { useState, useEffect } from 'react';

function App() {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(data => {
        const top5Ids = data.slice(0, 5);
        return Promise.all(top5Ids.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        ));
      })
      .then(stories => {
        setStories(stories);
        setFilteredStories(stories);
      })
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  useEffect(() => {
    setFilteredStories(
      stories.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, stories]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-base-200 text-base-content'}`}>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Top 5 Hacker News Stories</h1>
          <button 
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search stories..." 
          className="input input-bordered w-full mb-4"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="space-y-4">
          {filteredStories.map(story => (
            <li key={story.id} className="p-4 bg-base-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-sm text-gray-500">Upvotes: {story.score}</p>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;