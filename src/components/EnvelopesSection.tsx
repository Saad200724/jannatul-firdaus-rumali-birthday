import React, { useState } from 'react';
import { Mail, Sparkles, X, Heart, Feather, Star, Compass, Flower2 } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerLuxuryConfetti } from '../utils/confetti';

interface Letter {
  id: number;
  title: string;
  tagline: string;
  sealColor: string;
  icon: typeof Feather;
  content: {
    greeting: string;
    body: string[];
    signature: string;
  };
}

const letters: Letter[] = [
  {
    id: 1,
    title: "To The Star of September",
    tagline: "A letter on your born day",
    sealColor: "from-amber-400 to-yellow-600",
    icon: Star,
    content: {
      greeting: "Dearest Jannatul Firdaus Rumali,",
      body: [
        "September 18th is not merely another date on the calendar; it is the day the world was blessed with a heart as pure and luminous as yours.",
        "Your presence carries an extraordinary warmth—like soft golden sunlight breaking through autumn leaves. You bring serenity to chaotic days and laughter wherever you go.",
        "May this year unfold new horizons of happiness, deep peace, and dreams coming true faster than you ever imagined."
      ],
      signature: "Forever admiring your light ✨"
    }
  },
  {
    id: 2,
    title: "Grace, Strength & Brilliance",
    tagline: "Honoring who you are",
    sealColor: "from-rose-400 to-pink-600",
    icon: Flower2,
    content: {
      greeting: "Beloved Rumali,",
      body: [
        "Your name holds the fragrance of Jannatul Firdaus—a garden of supreme serenity and beauty. And in every way, you live up to that sacred grace.",
        "Your empathy is your superpower. The quiet strength with which you face challenges, the gentleness with which you care for others, and your magnetic intelligence make you truly one in a billion.",
        "Never dim your light for anyone. Wear your crown proudly every single day!"
      ],
      signature: "With deepest respect & adoration 🌸"
    }
  },
  {
    id: 3,
    title: "The Golden Compass",
    tagline: "Wishes for your journey ahead",
    sealColor: "from-purple-400 to-indigo-600",
    icon: Compass,
    content: {
      greeting: "Sweetest Rumali,",
      body: [
        "As you step into another marvelous chapter of your life, may doors of boundless opportunities swing wide open for you.",
        "May wisdom guide your choices, may prosperity accompany your footsteps, and may love always surround you like an impenetrable fortress.",
        "Here is to more adventures, countless joyous victories, unforgettable late-night laughs, and endless reasons to smile."
      ],
      signature: "Cheers to your limitless future 🥂"
    }
  },
  {
    id: 4,
    title: "A Heavenly Blessing",
    tagline: "Dua & eternal well-wishes",
    sealColor: "from-emerald-400 to-teal-600",
    icon: Heart,
    content: {
      greeting: "Dearest Jannat (Rumali),",
      body: [
        "May the Almighty bless you with vibrant health, peace of mind, righteous company, and unshakeable contentment in both worlds.",
        "May every tear you've ever shed be repaid with tenfold joy, and may every kind deed you've done return to you as endless barakah.",
        "Happy 18th September! Keep shining, keep thriving, and keep blessing the world simply by being you."
      ],
      signature: "With endless Duas & Love 🤲"
    }
  }
];

export const EnvelopesSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);

  const handleOpenLetter = (letter: Letter) => {
    setActiveLetter(letter);
    soundFx.playSparkle();
    triggerLuxuryConfetti();
  };

  const handleClose = () => {
    setActiveLetter(null);
  };

  return (
    <section id="special-letters" className="relative py-24 px-4 scroll-mt-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>Private Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Wax-Sealed <span className="gold-gradient-text">Letters For Rumali</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Click on any wax seal to break the seal and unfold the handwritten words written just for you.
          </p>
        </div>

        {/* 4 Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {letters.map((letter) => {
            const Icon = letter.icon;
            return (
              <div
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="group cursor-pointer relative p-6 rounded-3xl glass-card border border-white/10 hover:border-gold-400/60 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:-translate-y-2"
              >
                {/* Vintage Envelope Top Flap Illusion */}
                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none"></div>

                <div className="space-y-3 z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Letter #{letter.id}
                    </span>
                    <Icon className="w-5 h-5 text-gold-400/80 group-hover:text-gold-300 transition-colors" />
                  </div>
                  <h3 className="text-lg font-cinzel font-bold text-white group-hover:text-gold-200 transition-colors">
                    {letter.title}
                  </h3>
                  <p className="text-xs text-rose-300/80 font-serif italic">
                    {letter.tagline}
                  </p>
                </div>

                {/* Wax Seal Centerpiece */}
                <div className="my-4 flex flex-col items-center justify-center z-10">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${letter.sealColor} flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <span className="text-midnight-950 font-serif font-black text-xl italic drop-shadow-sm">
                      JFR
                    </span>
                  </div>
                  <span className="text-[11px] text-gold-300/90 font-medium tracking-wide mt-2 group-hover:text-gold-200">
                    Tap to Break Seal ✨
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400">
                  <span>To: Jannatul Firdaus</span>
                  <span>18 Sept</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Letter Modal */}
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-[#0e0f29] border-2 border-gold-400/50 shadow-[0_0_80px_rgba(245,208,97,0.35)] space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="space-y-1 border-b border-gold-500/20 pb-4">
                <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-cinzel font-semibold tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SPECIAL BIRTHDAY DISPATCH • 18TH SEPTEMBER</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                  {activeLetter.title}
                </h3>
              </div>

              {/* Letter Body */}
              <div className="space-y-4 text-slate-200 font-sans text-sm sm:text-base leading-relaxed">
                <p className="font-serif italic text-lg text-rose-300 font-semibold">
                  {activeLetter.content.greeting}
                </p>
                {activeLetter.content.body.map((para, i) => (
                  <p key={i} className="text-slate-300 font-light">
                    {para}
                  </p>
                ))}
                <p className="pt-4 font-script text-2xl text-gold-300 text-right">
                  {activeLetter.content.signature}
                </p>
              </div>

              {/* Letter Footer */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-rose-300">
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>With all love for Jannatul Firdaus Rumali</span>
                </div>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-midnight-950 font-cinzel font-bold text-xs tracking-wider transition-all"
                >
                  Close Letter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
