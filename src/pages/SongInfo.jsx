import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SongInfo() {
  const { songTitle } = useParams();
  const [song, setSong] = useState(null);
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
        const foundSong = data.songs.find(s => 
          s.title.toLowerCase().replace(/\s+/g, '-') === songTitle
        );
        if (foundSong) {
          setSong(foundSong);
        } else {
          setError('Song not found!');
        }
      })
      .catch(error => {
        console.error('Error fetching song:', error);
        setError('Failed to load song details. Please try again later.');
      });
  }, [songTitle]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!song) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{song.title}</h2>
      <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p>
      <p>Year: {song.year}</p>
    </div>
  );
}

export default SongInfo;
