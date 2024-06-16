import React, { useState, useEffect } from 'react';

function App() {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState([]);

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
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto p-4 max-w-screen-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Top 5 Hacker News Stories</h1>
        <input 
          type="text" 
          placeholder="Search stories..." 
          className="input input-bordered w-full mb-4 sm:mb-2 sm:text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="space-y-4">
          {filteredStories.map(story => (
            <li key={story.id} className="p-4 bg-base-100 rounded-lg shadow sm:p-2">
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