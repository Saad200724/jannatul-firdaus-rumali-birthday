import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Heart, Cake } from 'lucide-react';
import { triggerLuxuryConfetti } from '../utils/confetti';
import { soundFx } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isCelebrationDay: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isCelebrationDay: true });

  const [wishPopped, setWishPopped] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 8, 18, 0, 0, 0); // September 18th (0-indexed month: 8)

      // If already past this year's Sept 18th 23:59:59, set target to next year
      const endOfCelebration = new Date(currentYear, 8, 18, 23, 59, 59);
      if (now > endOfCelebration) {
        targetDate = new Date(currentYear + 1, 8, 18, 0, 0, 0);
      }

      const isToday = now.getMonth() === 8 && now.getDate() === 18;

      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0 || isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCelebrationDay: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isCelebrationDay: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCelebrate = () => {
    setWishPopped(true);
    triggerLuxuryConfetti();
    soundFx.playSparkle();
    soundFx.playFanfare();
    setTimeout(() => setWishPopped(false), 3000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 space-y-6">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-400/40 text-gold-300 shadow-gold-glow/20 animate-float">
          <Crown className="w-4 h-4 text-gold-400 fill-gold-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold">
            Honoring The Birthday Queen • 18th September
          </span>
          <Sparkles className="w-4 h-4 text-gold-300" />
        </div>

        {/* Main Grand Typography */}
        <div className="space-y-3">
          <p className="text-lg md:text-xl text-rose-300/90 font-serif italic tracking-wide">
            Wishing a glorious & unforgettable birthday to
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-cinzel tracking-tight leading-none text-white drop-shadow-2xl">
            <span className="block gold-gradient-text">Jannatul Firdaus</span>
            <span className="block mt-1 rose-gold-gradient-text font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl">
              Rumali
            </span>
          </h1>
        </div>

        {/* Subtitle / Meaning */}
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
          A soul as radiant as the celestial gardens of <span className="text-gold-300 font-medium italic">Firdaus</span>. 
          Today we celebrate your grace, warmth, endless charm, and the joy you bring into the world.
        </p>

        {/* Countdown or Celebration Live Pill */}
        <div className="py-2">
          {timeLeft.isCelebrationDay ? (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500/20 via-gold-500/20 to-purple-500/20 border border-gold-400/40 shadow-gold-glow/30 backdrop-blur-md animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
              </span>
              <span className="text-base sm:text-lg font-cinzel font-bold text-gold-200 tracking-wider">
                ✨ TODAY IS THE BIG DAY! HAPPY BIRTHDAY RUMALI! ✨
              </span>
            </div>
          ) : (
            <div className="inline-grid grid-cols-4 gap-2 sm:gap-4 p-4 rounded-2xl glass-panel border border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold font-cinzel text-gold-300">{timeLeft.days}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold font-cinzel text-rose-300">{timeLeft.hours}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold font-cinzel text-purple-300">{timeLeft.minutes}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Mins</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-300">{timeLeft.seconds}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Secs</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleCelebrate}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-amber-400 to-rose-500 text-midnight-950 font-bold font-cinzel tracking-wider text-sm sm:text-base shadow-gold-glow hover:shadow-[0_0_35px_rgba(245,208,97,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-45" />
            <span>{wishPopped ? "🎉 CELEBRATING RUMALI! 🎉" : "MAKE A WISH & CELEBRATE ✨"}</span>
            <Heart className="w-5 h-5 fill-midnight-950/40" />
          </button>

          <a
            href="#birthday-cake"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-card text-white hover:text-gold-300 border border-white/20 hover:border-gold-400/50 font-cinzel font-semibold text-sm tracking-wide transition-all hover:scale-105"
          >
            <Cake className="w-4 h-4 text-gold-400" />
            <span>Blow The Candles</span>
          </a>
        </div>

        {/* Quick Navigation Ribbon */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
          <a href="#birthday-cake" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            🎂 Birthday Cake
          </a>
          <a href="#special-letters" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            💌 Wax-Sealed Letters
          </a>
          <a href="#rumali-charms" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            👑 Why She's Special
          </a>
          <a href="#memory-gallery" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            📸 Polaroids & Moments
          </a>
          <a href="#wish-board" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            ✍️ Wish Board
          </a>
          <a href="#keepsake-card" className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-gold-300 border border-white/5 transition-all">
            ✨ Keepsake Card
          </a>
        </div>
      </div>
    </section>
  );
};
