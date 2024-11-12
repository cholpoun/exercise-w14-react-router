import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/src/data/songs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.songs)) {
          setSongs(data.songs);
        } else {
          throw new Error("Data fetched does not contain a 'songs' array");
        }
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        setError('Failed to load songs. Please try again later.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Rolling Stones 500 Greatest Songs of All Time</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <Link to={`/song/${encodeURIComponent(song.title.toLowerCase().replace(/\s+/g, '-'))}`}>
              {song.title} - {song.artist}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
