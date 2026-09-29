import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [partyMode, setPartyMode] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.audio.current.play();
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const togglePartyMode = () => {
    setPartyMode(!partyMode);
  };

  return (
    <div>
      <AudioPlayer
        ref={playerRef}
        src="/party-music/snackster-party-music.mp3"
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />
      <button onClick={togglePartyMode}>
        {partyMode ? 'Stop Party Mode' : 'Start Party Mode'}
      </button>
    </div>
  );
};

export default MusicPlayer;
