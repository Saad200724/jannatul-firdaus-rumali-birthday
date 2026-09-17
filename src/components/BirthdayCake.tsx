import React, { useState } from 'react';
import { Sparkles, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import { triggerFireworks, triggerLuxuryConfetti } from '../utils/confetti';
import { soundFx } from '../utils/audio';

export const BirthdayCake: React.FC = () => {
  const [isLit, setIsLit] = useState(true);
  const [showWishModal, setShowWishModal] = useState(false);

  const handleBlowCandles = () => {
    if (!isLit) return;
    setIsLit(false);
    soundFx.playBlow();
    
    setTimeout(() => {
      soundFx.playFanfare();
      triggerFireworks();
      triggerLuxuryConfetti();
      setShowWishModal(true);
    }, 400);
  };

  const handleRelight = () => {
    setIsLit(true);
    soundFx.playSparkle();
  };

  return (
    <section id="birthday-cake" className="relative py-24 px-4 scroll-mt-12">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Sacred Birthday Ritual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Make A Secret Wish & <span className="gold-gradient-text">Blow The Candles</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Close your eyes, make the deepest wish of your heart, Rumali, and blow out the flames!
          </p>
        </div>

        {/* Interactive Cake Visualizer */}
        <div className="relative max-w-md mx-auto p-8 rounded-3xl glass-panel border border-gold-500/30 flex flex-col items-center justify-center">
          {/* Subtle Stage Spotlight Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-400/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Candles Container */}
          <div className="relative flex justify-center items-end gap-6 sm:gap-8 z-10 -mb-2">
            {[0, 1, 2].map((candleIndex) => (
              <div key={candleIndex} className="relative flex flex-col items-center">
                {/* Flame */}
                {isLit ? (
                  <div 
                    onClick={handleBlowCandles}
                    className="cursor-pointer group flex flex-col items-center transition-transform hover:scale-125"
                    title="Tap to blow out!"
                  >
                    <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-300 to-white rounded-full candle-flame-anim shadow-[0_0_20px_#ff9800]"></div>
                    <div className="w-1.5 h-2 bg-slate-900 rounded-sm"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center h-9 justify-end">
                    {/* Smoke wisp */}
                    <div className="w-1.5 h-4 bg-slate-400/40 rounded-full animate-pulse blur-[1px]"></div>
                    <div className="w-1.5 h-2 bg-slate-700 rounded-sm"></div>
                  </div>
                )}
                {/* Candle Body */}
                <div className="w-4 sm:w-5 h-14 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500 rounded-t-md shadow-md border-t border-rose-200 flex flex-col justify-between py-1 items-center">
                  <div className="w-2.5 h-1 bg-white/40 rounded-full"></div>
                  <div className="w-2.5 h-1 bg-gold-300/60 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="relative w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-2xl shadow-lg border-b-4 border-pink-400 flex items-center justify-around px-3 z-20">
            <span className="text-xs text-rose-800 font-script font-bold text-sm">Rumali</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
            <span className="text-xs text-rose-800 font-cinzel font-bold">18th • 2008</span>
          </div>

          {/* Tier 2 (Middle Tier) */}
          <div className="relative w-60 sm:w-72 h-16 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 rounded-t-2xl shadow-lg border-b-4 border-amber-300 flex items-center justify-between px-6 z-10 -mt-1">
            <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-gold-500 shadow-sm"></div>
            <span className="text-[11px] font-cinzel font-extrabold text-amber-900 tracking-wider">★ 18 YEARS ★</span>
            <div className="w-3 h-3 rounded-full bg-gold-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-rose-400 shadow-sm"></div>
          </div>

          {/* Tier 3 (Base Tier) */}
          <div className="relative w-72 sm:w-88 h-18 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 rounded-t-2xl shadow-2xl border-b-4 border-purple-300 flex items-center justify-around px-8 z-0 -mt-1">
            <span className="text-xs uppercase tracking-widest text-purple-900 font-bold font-cinzel">✨ Queen Jannatul Firdaus ✨</span>
          </div>

          {/* Cake Stand Base */}
          <div className="w-80 sm:w-96 h-4 bg-gradient-to-r from-gold-300 via-yellow-100 to-gold-400 rounded-full shadow-gold-glow -mt-0.5"></div>
          <div className="w-24 h-6 bg-gradient-to-b from-gold-400 to-gold-600 rounded-b-xl shadow-md"></div>
          <div className="w-40 h-3 bg-gradient-to-r from-gold-300 via-yellow-200 to-gold-500 rounded-full shadow-lg"></div>

          {/* Status & Controls */}
          <div className="mt-8 flex flex-col items-center gap-3 z-10">
            {isLit ? (
              <button
                onClick={handleBlowCandles}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-cinzel font-bold text-sm tracking-widest shadow-rose-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
                <span>BLOW OUT THE CANDLES 💨</span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                <div className="inline-flex items-center gap-2 text-gold-300 font-cinzel font-bold text-sm bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-400/30">
                  <PartyPopper className="w-4 h-4 text-gold-400" />
                  <span>WISH SENT TO THE UNIVERSE! ✨</span>
                </div>
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Candles</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wish Granted Notification Modal */}
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="relative max-w-lg w-full p-8 rounded-3xl glass-panel-rose border-2 border-gold-400/60 text-center space-y-6 shadow-[0_0_60px_rgba(245,208,97,0.3)]">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-gold-400 to-rose-400 flex items-center justify-center shadow-gold-glow">
                <Sparkles className="w-8 h-8 text-midnight-950" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold gold-gradient-text">
                  A Wish For Jannatul Firdaus Rumali
                </h3>
                <p className="text-rose-200 font-serif italic text-sm">
                  "May every prayer you whisper turn into a blooming blessing."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-midnight-950/60 border border-white/10 text-slate-200 text-sm leading-relaxed text-left font-light">
                <p>
                  Dear <strong>Rumali</strong>, on this Golden 18th Birthday (Born 18th September 2008), may your adult journey be wrapped in boundless joy, divine peace, triumphant success, and unconditional warmth. May you always walk with your signature grace and infectious light! 🌟
                </p>
              </div>

              <button
                onClick={() => setShowWishModal(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-gold-400 to-rose-500 text-midnight-950 font-cinzel font-bold tracking-wider hover:opacity-95 transition-opacity"
              >
                Ameen & Thank You! ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
