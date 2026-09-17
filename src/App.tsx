import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Volume2, VolumeX, RotateCcw, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './utils/audio';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isCandleLit, setIsCandleLit] = useState(true);

  const triggerCelebration = () => {
    soundFx.playSparkle();
    soundFx.playFanfare();

    const count = 180;
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ffd700', '#f43f5e', '#ffffff'] });
    fire(0.2, { spread: 60, colors: ['#fb7185', '#ffd700', '#a855f7'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#fda4af', '#fef08a', '#e9d5ff'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, shapes: ['star'], colors: ['#ffd700'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#f43f5e', '#fbbf24', '#c084fc'] });
  };

  const handleOpenCard = () => {
    setIsOpen(true);
    setIsCandleLit(true);
    triggerCelebration();
    if (!musicPlaying) {
      soundFx.toggleAmbientMusic();
      setMusicPlaying(true);
    }
  };

  const handleBlowCandle = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    soundFx.playBlow();
    setTimeout(() => {
      triggerCelebration();
    }, 300);
  };

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setIsCandleLit(true);
    soundFx.playSparkle();
  };

  return (
    <div className="min-h-screen bg-[#090a16] text-slate-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-900/20 blur-[100px] pointer-events-none"></div>

      {/* Top Bar */}
      <header className="w-full max-w-lg flex justify-between items-center z-20 pt-2">
        <div className="flex items-center gap-2 text-gold-400/90 text-xs tracking-widest uppercase font-semibold">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>18th September 2008</span>
        </div>

        <button
          onClick={handleToggleSound}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-gold-300 transition-all"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-lg my-auto py-6 z-10 flex flex-col items-center">
        {!isOpen ? (
          /* CLOSED STATE: Minimal & Elegant Surprise */
          <div className="w-full text-center space-y-8 animate-fade-in">
            <div className="space-y-3">
              <span className="inline-block px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest uppercase font-medium">
                ✨ Special Birthday Surprise
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-snug">
                For <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300">Jannatul Firdaus Rumali</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base font-light">
                Today marks your Golden 18th Birthday. A special message is waiting inside for you.
              </p>
            </div>

            {/* Click to Open Card Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleOpenCard}
                className="group relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-b from-[#13152d] to-[#0d0e22] border border-gold-500/30 hover:border-gold-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(245,208,97,0.2)] flex flex-col items-center gap-5 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-rose-500/20 border border-gold-400/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-10 h-10 text-amber-300 group-hover:text-amber-200 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <span className="block text-sm uppercase font-bold tracking-widest text-amber-200 group-hover:text-white transition-colors">
                    Click To Open Birthday Card
                  </span>
                  <span className="block text-xs text-slate-400 font-light">
                    Tap to reveal wishes & celebration ✨
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* OPENED STATE: Premium Birthday Card with Aesthetic Cake */
          <div className="w-full bg-gradient-to-b from-[#141630] to-[#0e0f22] border border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center space-y-6 animate-fade-in relative">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Happy 18th Birthday • 18 Sept 2008</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-rose-300">
                Jannatul Firdaus Rumali
              </h2>
              <p className="text-xs text-rose-300/90 font-serif italic">
                18 Golden Years of Radiance & Grace
              </p>
            </div>

            {/* Premium Aesthetic Birthday Cake */}
            <div className="py-3 flex flex-col items-center justify-center">
              <div 
                onClick={handleBlowCandle}
                className="cursor-pointer group relative flex flex-col items-center select-none"
                title={isCandleLit ? "Click to blow the candle!" : "Candle blown!"}
              >
                {/* Flame & Candle */}
                <div className="flex flex-col items-center">
                  {isCandleLit ? (
                    <div className="flex flex-col items-center group-hover:scale-110 transition-transform">
                      <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-white rounded-full animate-flame shadow-[0_0_18px_#ff9800]"></div>
                      <div className="w-1 h-1.5 bg-slate-900"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center h-7 justify-end">
                      <div className="w-1.5 h-4 bg-slate-400/50 rounded-full animate-pulse blur-[1px]"></div>
                      <div className="w-1 h-1.5 bg-slate-700"></div>
                    </div>
                  )}

                  {/* Candle Stick */}
                  <div className="w-3.5 h-8 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500 rounded-t-sm shadow border-t border-rose-200 flex flex-col justify-between py-0.5 items-center">
                    <div className="w-2 h-0.5 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-0.5 bg-gold-300/70 rounded-full"></div>
                  </div>
                </div>

                {/* Cake Tier 1 (Top Tier) */}
                <div className="w-36 h-10 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-xl shadow-md border-b-2 border-pink-300 flex items-center justify-center -mt-0.5 z-10">
                  <span className="text-[11px] text-rose-900 font-serif font-bold tracking-wider">Rumali • 18</span>
                </div>

                {/* Cake Tier 2 (Base Tier) */} 
                <div className="w-52 h-12 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 rounded-t-xl shadow-lg border-b-2 border-amber-300 flex items-center justify-between px-4 -mt-0.5"> 
                <p className="w-full flex justify-between text-[10px] text-amber-900 font-bold tracking-widest uppercase">
                    <span>✨</span>
                    <span>18th</span>
                    <span>Sept</span>
                    <span>2008</span>
                    <span>✨</span>
                </p>
                </div>

                {/* Cake Stand */}
                <div className="w-60 h-2.5 bg-gradient-to-r from-gold-300 via-yellow-200 to-gold-400 rounded-full shadow-md -mt-0.5"></div>

                {/* Micro hint */}
                <span className="text-[11px] text-amber-300/80 font-medium tracking-wide mt-2 group-hover:text-amber-200 transition-colors">
                  {isCandleLit ? "Tap candle to blow & make a wish 💨" : "✨ Wish granted! Happy Birthday! ✨"}
                </span>
              </div>
            </div>

            {/* Card Wish Message & Signature */}
            <div className="p-5 sm:p-6 rounded-2xl bg-midnight-950/60 border border-white/5 text-slate-200 text-sm sm:text-base leading-relaxed text-left font-light space-y-3">
              <p>
                Dearest <strong>Rumali</strong>,
              </p>
              <p>
                Happy 18th Birthday! ✨ May this special milestone year bring you boundless happiness, peace of mind, righteous success, and endless reasons to smile.
              </p>
              <p>
                May you always stay as radiant, kind, and graceful as the celestial gardens of Firdaus. Wishing you a truly blessed journey ahead! 🌸
              </p>
              <div className="pt-3 border-t border-white/10 text-right space-y-0.5">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Best Wishes & Prayers —
                </span>
                <span className="block font-serif italic text-base sm:text-lg text-amber-300 font-bold">
                  Shahariar Nafis
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={triggerCelebration}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Celebrate Again 🎉</span>
              </button>

              <button
                onClick={handleReplay}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Close Card</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-lg text-center py-2 text-xs text-slate-500 z-10 flex items-center justify-center gap-1.5">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        <span>for Jannatul Firdaus Rumali</span>
      </footer>
    </div>
  );
};

export default App;
