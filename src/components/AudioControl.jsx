import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Icon } from '@iconify/react';
import volumeHigh from '@iconify-icons/mdi/volume-high';
import volumeOff from '@iconify-icons/mdi/volume-off';
import { IconButton } from '@mui/material';

const AudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Auto-play on site load
  const playerRef = useRef(null);

  useEffect(() => {
    const handleUserGesture = () => {
      const audio = playerRef.current?.audio?.current;
      if (audio) {
        audio.play().catch(() => {
          // Muting and unmuting to bypass autoplay restrictions
          audio.muted = true;
          audio.play().then(() => {
            audio.muted = false;
          });
        });
      }
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };

    window.addEventListener('click', handleUserGesture);
    window.addEventListener('touchstart', handleUserGesture);

    // Try to autoplay
    const audio = playerRef.current?.audio?.current;
    if (audio) {
      audio.play().catch(() => {});
    }

    return () => {
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, []);

  const toggleAudio = () => {
    setIsPlaying((prevState) => {
      const audio = playerRef.current.audio.current;
      if (prevState) {
        audio.pause();
      } else {
        audio.play();
      }
      return !prevState;
    });
  };

  return (
    <div>
      <IconButton
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          backgroundColor: '#f50057',
          color: 'white',
          zIndex: 1000,
        }}
      >
        {isPlaying ? <Icon icon={volumeHigh} width={42} /> : <Icon icon={volumeOff} width={42} />}
      </IconButton>

      <AudioPlayer
        ref={playerRef}
        src="/party-music/snackster-party-music.mp3"
        autoPlay={false} // Changed to false to prevent autoplay on mobile
        loop
        style={{ display: 'none' }} // Hide the player UI
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // Added to allow media for autoplay popup for browser side
        controlsList="nodownload"
        // AutoplayAllowed tag to force autoplay on browser
        autoPlayAllowed
      />
    </div>
  );
};

export default AudioControl;
