import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(ids => {
        const topFiveIds = ids.slice(0, 5);
        return Promise.all(topFiveIds.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        ));
      })
      .then(stories => setStories(stories));
  }, []);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Top 5 Hacker News Stories</h1>
      <input
        type="text"
        placeholder="Search stories..."
        className="input input-bordered w-full mb-4"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {filteredStories.map(story => (
          <li key={story.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-600">Upvotes: {story.score}</p>
            <a href={story.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;