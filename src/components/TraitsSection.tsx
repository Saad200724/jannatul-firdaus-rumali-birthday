import React, { useState } from 'react';
import { Sparkles, Crown, Sun, Gem, Heart, Compass, Smile, Eye } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Trait {
  id: number;
  icon: typeof Crown;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  colorClass: string;
}

const traits: Trait[] = [
  {
    id: 1,
    icon: Crown,
    title: "Ethereal Grace",
    subtitle: "Regal Demeanor",
    description: "Every step you take and every word you speak reflects poise, gentleness, and undeniable royal majesty.",
    quote: "\"True elegance is when the inside is as beautiful as the outside.\"",
    colorClass: "from-amber-400 to-yellow-600"
  },
  {
    id: 2,
    icon: Sun,
    title: "Luminous Kindness",
    subtitle: "A Heart of Pure Gold",
    description: "You illuminate the gloomiest days with your thoughtful gestures, empathy, and sincere concern for everyone around you.",
    quote: "\"Your smile has the power to heal weary souls.\"",
    colorClass: "from-rose-400 to-pink-600"
  },
  {
    id: 3,
    icon: Gem,
    title: "Brilliance & Intellect",
    subtitle: "Sharp & Visionary",
    description: "Behind your gentle smile lies a razor-sharp intellect, deep wisdom, and boundless curiosity that inspires everyone.",
    quote: "\"A mind filled with wonder and determination.\"",
    colorClass: "from-purple-400 to-indigo-600"
  },
  {
    id: 4,
    icon: Smile,
    title: "Infectious Joy",
    subtitle: "The Life of Every Room",
    description: "Your laughter is musical, uplifting, and completely contagious. Being around you feels like pure sunshine.",
    quote: "\"Wherever you go, joy naturally follows in your wake.\"",
    colorClass: "from-cyan-400 to-blue-600"
  },
  {
    id: 5,
    icon: Heart,
    title: "Pure Sincerity",
    subtitle: "Authentic & Grounded",
    description: "In a world of filters and pretense, your authenticity shines like a polished diamond. Genuine, honest, and forever loyal.",
    quote: "\"A rare gem whose value cannot be measured.\"",
    colorClass: "from-emerald-400 to-teal-600"
  },
  {
    id: 6,
    icon: Compass,
    title: "Fearless Spirit",
    subtitle: "Destined for Greatness",
    description: "You conquer every milestone with courage and dignity. The world has only seen the beginning of your grand journey.",
    quote: "\"Born to stand tall, achieve dreams, and conquer stars.\"",
    colorClass: "from-fuchsia-400 to-rose-600"
  }
];

const secretCompliments = [
  "Rumali, your aura is unmatched! ✨",
  "You make the world 1000x better simply by existing 🌸",
  "Your smile can literally brighten the darkest thunderstorm ☀️",
  "May this 18th September bring everything your heart silently longs for 💫",
  "You are destined for monumental achievements and lifelong joy 👑"
];

export const TraitsSection: React.FC = () => {
  const [complimentIndex, setComplimentIndex] = useState(0);

  const handleNextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % secretCompliments.length);
    soundFx.playSparkle();
  };

  return (
    <section id="rumali-charms" className="relative py-24 px-4 scroll-mt-12 bg-midnight-900/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Honoring Her Brilliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Why <span className="gold-gradient-text">Rumali</span> is One in a Billion
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Six of the countless reasons why Jannatul Firdaus Rumali is deeply cherished.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traits.map((trait) => {
            const Icon = trait.icon;
            return (
              <div
                key={trait.id}
                className="group relative p-8 rounded-3xl glass-card border border-white/10 hover:border-gold-400/50 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold-glow/20"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${trait.colorClass} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-midnight-950/80 rounded-[14px] flex items-center justify-center group-hover:bg-midnight-950/40 transition-colors">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-300">
                      {trait.subtitle}
                    </span>
                    <h3 className="text-xl font-cinzel font-bold text-white group-hover:text-gold-300 transition-colors">
                      {trait.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {trait.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-serif italic text-gold-200/90">
                    {trait.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Random Compliment Box */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-gold-400/40 text-center space-y-4 shadow-gold-glow/20">
          <div className="flex items-center justify-center gap-2 text-gold-400 text-xs font-cinzel font-semibold tracking-widest">
            <Eye className="w-4 h-4" />
            <span>DAILY RADIANCE AFFIRMATION</span>
          </div>

          <p className="text-lg sm:text-xl font-serif italic text-rose-200 min-h-[3.5rem] flex items-center justify-center">
            "{secretCompliments[complimentIndex]}"
          </p>

          <button
            onClick={handleNextCompliment}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 border border-gold-400/30 font-cinzel font-bold text-xs tracking-wider transition-all hover:scale-105 active:scale-95"
          >
            ✨ Tap For Another Compliment ✨
          </button>
        </div>
      </div>
    </section>
  );
};
