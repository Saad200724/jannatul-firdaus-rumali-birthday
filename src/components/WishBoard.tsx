import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { triggerLuxuryConfetti } from '../utils/confetti';

interface Wish {
  id: string;
  name: string;
  message: string;
  sticker: string;
  date: string;
  likes: number;
}

const initialWishes: Wish[] = [
  {
    id: "1",
    name: "A Well Wisher",
    message: "Happy Birthday Jannatul Firdaus Rumali! May your day be as dazzling and beautiful as your soul. Stay blessed forever! 🌸",
    sticker: "👑",
    date: "18th September",
    likes: 12
  },
  {
    id: "2",
    name: "Secret Admirer",
    message: "Wishing the sweetest Rumali a year full of massive success, contagious laughter, and all the dreams coming true. Happy 18th Sept! ✨",
    sticker: "✨",
    date: "18th September",
    likes: 8
  },
  {
    id: "3",
    name: "True Friend",
    message: "May Allah protect your gentle heart and bestow Jannat's infinite blessings upon you. Happy Birthday Rumali! 🎂🎉",
    sticker: "💖",
    date: "18th September",
    likes: 15
  }
];

export const WishBoard: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('rumali_birthday_wishes');
      return saved ? JSON.parse(saved) : initialWishes;
    } catch {
      return initialWishes;
    }
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('👑');

  useEffect(() => {
    try {
      localStorage.setItem('rumali_birthday_wishes', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      sticker: selectedSticker,
      date: "Just now",
      likes: 1
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
    soundFx.playSparkle();
    triggerLuxuryConfetti();
  };

  const handleLike = (id: string) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w));
    soundFx.playSparkle();
  };

  const stickers = ['👑', '✨', '🌸', '💖', '🎂', '🌟', '🕊️', '💐'];

  return (
    <section id="wish-board" className="relative py-24 px-4 scroll-mt-12 bg-midnight-900/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs uppercase tracking-widest">
            <MessageSquareHeart className="w-3.5 h-3.5 text-gold-400" />
            <span>Community Love & Prayers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Leave A <span className="gold-gradient-text">Birthday Wish</span> For Rumali
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Pen down your warmest congratulations, blessings, and sweet memories to be etched on Rumali's virtual wall.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wish Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-gold-400/30 space-y-6">
            <h3 className="text-xl font-cinzel font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span>Send Your Blessing</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Ayesha / Shanto / Best Friend"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Choose A Celebration Badge
                </label>
                <div className="flex flex-wrap gap-2">
                  {stickers.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedSticker(st)}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all ${
                        selectedSticker === st
                          ? 'bg-gold-400/30 border-2 border-gold-400 scale-110 shadow-gold-glow/40'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Heartfelt Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something memorable and uplifting for Jannatul Firdaus Rumali..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-amber-400 to-rose-500 text-midnight-950 font-cinzel font-bold text-sm tracking-wider shadow-gold-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>POST WISH ON BOARD ✨</span>
              </button>
            </form>
          </div>

          {/* Wishes List */}
          <div className="lg:col-span-7 space-y-4 max-h-[620px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl glass-card border border-white/10 space-y-3 relative group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-gold-400/30 flex items-center justify-center text-xl shadow-sm">
                      {item.sticker}
                    </div>
                    <div>
                      <h4 className="font-cinzel font-bold text-white text-base">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-white/5 transition-all hover:scale-105"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>{item.likes}</span>
                  </button>
                </div>

                <p className="text-slate-200 text-sm font-light leading-relaxed pl-1">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
