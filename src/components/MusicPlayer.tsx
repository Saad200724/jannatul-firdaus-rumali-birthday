import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsPlaying(soundFx.getBgmPlaying());
    setIsMuted(soundFx.getMuted());
  }, []);

  const handleToggleMusic = () => {
    const active = soundFx.toggleAmbientMusic();
    setIsPlaying(active);
    soundFx.playSparkle();
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playSparkle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-midnight-900/80 backdrop-blur-xl border border-gold-500/30 px-4 py-2.5 rounded-full shadow-gold-glow/20 transition-all hover:scale-105">
      {/* Visualizer bars when playing */}
      <button
        onClick={handleToggleMusic}
        className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-300 hover:text-gold-200 transition-colors"
        title={isPlaying ? "Pause Ambient Music" : "Play Ambient Melody"}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
        <span className="hidden sm:inline">
          {isPlaying ? 'Birthday Melody' : 'Play Music'}
        </span>
        
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 mx-1">
            <span className="w-1 bg-gold-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.1s] h-full"></span>
            <span className="w-1 bg-rose-400 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.3s] h-2/3"></span>
            <span className="w-1 bg-gold-300 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.2s] h-4/5"></span>
            <span className="w-1 bg-rose-300 rounded-full animate-[bounce_1.0s_ease-in-out_infinite_0.4s] h-1/2"></span>
          </div>
        )}
      </button>

      <div className="h-4 w-px bg-white/20 mx-1"></div>

      {/* Mute Button */}
      <button
        onClick={handleToggleMute}
        className="p-1 rounded-full text-slate-300 hover:text-gold-300 hover:bg-white/10 transition-all"
        title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-rose-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-gold-400" />
        )}
      </button>
    </div>
  );
};
