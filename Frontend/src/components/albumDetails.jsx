import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useLocation } from 'react-router-dom';
import "./albumDetails.css";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';

const AlbumDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { songs = [], playSong, toggleLike, likedSongs = [] } = useOutletContext();
  const { albumName } = useParams();
  const decodedAlbumName = albumName
    ? decodeURIComponent(albumName)
    : location.state?.albumName || '';

  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        (song.album || '').trim().toLowerCase() ===
        decodedAlbumName.trim().toLowerCase()
    );
  }, [songs, decodedAlbumName]);

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    axios
      .get(`http://localhost:3000/api/playlists/${user._id || user.id}`)
      .then((res) => setPlaylists(res.data))
      .catch(console.error);
  }, []);

  const handleAddToPlaylist = async (songId) => {
    const playlistName = prompt(
      'Enter playlist name:\n' +
        playlists.map((p) => p.name).join('\n')
    );

    const playlist = playlists.find((p) => p.name === playlistName);

    if (!playlist) {
      alert('Playlist not found');
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/playlists/${playlist._id}/add-song`,
        { songId }
      );
      alert('Song added to playlist');
    } catch (err) {
      console.error(err);
      alert('Failed to add song');
    }
  };

  return (
    <div className="album-details-page">
      <button className="album-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="album-hero">
        <h1 className="album-title">{decodedAlbumName}</h1>
        <p className="album-song-count">{filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}</p>
      </div>
      {filteredSongs.map((song) => (
        <div key={song._id || song.id || song.title} className="album-song-card">
          <img
            src={`http://localhost:3000/${song.coverImage}`}
            alt={`${song.title} cover`}
            className="album-song-cover"
          />
          <div className="album-song-info">
            <div className="album-song-title">{song.title}</div>
            <div className="album-song-artist">{song.artist}</div>
          </div>
          <div className="album-buttons">
            <button className="album-play-btn" onClick={() => playSong(song, filteredSongs)}>▶</button>
            <button
              className="album-like-btn"
              onClick={(e) => toggleLike && toggleLike(e, song._id)}
            >
              {likedSongs.includes(song._id) ? (
                <FaHeart color="red" style={{ cursor: 'pointer' }} />
              ) : (
                <FaRegHeart style={{ cursor: 'pointer' }} />
              )}{' '}Like
            </button>
            <button className="album-playlist-btn" onClick={() => handleAddToPlaylist(song._id)}>➕</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumDetails;
