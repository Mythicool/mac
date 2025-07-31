import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState } from 'react'
import './MusicApp.css'

const MusicApp = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  
  const songs = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
    { title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02' },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '5:03' },
    { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:07' },
  ]

  return (
    <div className="music-app">
      <div className="music-header">
        <h2>Music</h2>
      </div>
      
      <div className="music-content">
        <div className="now-playing">
          <div className="album-art">
            <div className="album-placeholder">♪</div>
          </div>
          <div className="song-info">
            <h3>{songs[currentSong].title}</h3>
            <p>{songs[currentSong].artist}</p>
          </div>
        </div>
        
        <div className="music-controls">
          <button className="control-btn">
            <SkipBack size={20} />
          </button>
          <button 
            className="control-btn play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="control-btn">
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="progress-bar">
          <span className="time">1:23</span>
          <div className="progress">
            <div className="progress-fill" style={{ width: '25%' }}></div>
          </div>
          <span className="time">{songs[currentSong].duration}</span>
        </div>
        
        <div className="volume-control">
          <Volume2 size={16} />
          <div className="volume-slider">
            <div className="volume-fill" style={{ width: '70%' }}></div>
          </div>
        </div>
        
        <div className="playlist">
          <h4>Up Next</h4>
          {songs.map((song, index) => (
            <div 
              key={index} 
              className={`playlist-item ${index === currentSong ? 'active' : ''}`}
              onClick={() => setCurrentSong(index)}
            >
              <div className="song-details">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <div className="song-duration">{song.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicApp