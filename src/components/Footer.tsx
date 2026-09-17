import React from 'react';
import { Crown, Heart, ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundFx.playSparkle();
  };

  return (
    <footer className="relative py-16 px-4 border-t border-white/10 bg-midnight-950 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-6 z-10 relative">
        <div className="mx-auto w-12 h-12 rounded-full bg-white/5 border border-gold-400/30 flex items-center justify-center text-gold-300">
          <Crown className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-cinzel font-bold text-white">
            Happy Birthday <span className="gold-gradient-text">Jannatul Firdaus Rumali</span>
          </h3>
          <p className="text-rose-300/80 font-serif italic text-sm">
            May your 18th September sparkle with happiness, health, and limitless blessings.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 text-xs text-slate-400 pt-2">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>for a truly radiant soul</span>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-gold-300 text-xs font-cinzel font-semibold tracking-wider transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back To Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
