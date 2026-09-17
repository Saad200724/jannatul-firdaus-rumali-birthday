import React, { useState } from 'react';
import { Camera, Sparkles, X, Plus, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Memory {
  id: number;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  rotation: string;
}

const defaultMemories: Memory[] = [
  {
    id: 1,
    title: "Golden Hour Glow",
    date: "A Sunny Afternoon",
    caption: "That effortless radiance when the golden sun hits just right.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    rotation: "-rotate-2"
  },
  {
    id: 2,
    title: "Celestial Serenity",
    date: "Evening Starlight",
    caption: "Peaceful moments filled with dreams, ambitions, and gentle smiles.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-3"
  },
  {
    id: 3,
    title: "Celebration & Joy",
    date: "Sweet Moments",
    caption: "Laughter that resonates and creates memories etched in the heart forever.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    rotation: "-rotate-1"
  },
  {
    id: 4,
    title: "Pure Elegance",
    date: "Special Occasion",
    caption: "Stepping out with royalty, grace, and unmatched charm.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-2"
  }
];

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const handleOpenPhoto = (mem: Memory) => {
    setSelectedMemory(mem);
    soundFx.playSparkle();
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newMem: Memory = {
        id: Date.now(),
        title: "New Memory for Rumali",
        date: "18th September",
        caption: "A newly captured moment in celebration of Rumali's special day!",
        imageUrl: event.target?.result as string,
        rotation: (Math.random() > 0.5 ? "rotate-2" : "-rotate-2")
      };
      setMemories([newMem, ...memories]);
      soundFx.playSparkle();
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="memory-gallery" className="relative py-24 px-4 scroll-mt-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Treasured Snapshots</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Polaroid <span className="gold-gradient-text">Memory Wall</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Glimpses of beauty, laughter, and timeless grace. Click any photo to view in full glory or add your own!
          </p>
        </div>

        {/* Upload Custom Memory Ribbon */}
        <div className="flex justify-center">
          <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-gold-400/40 text-gold-300 hover:text-gold-200 hover:bg-gold-500/10 transition-all hover:scale-105">
            <Plus className="w-4 h-4" />
            <span className="text-xs uppercase font-cinzel font-bold tracking-wider">
              Add Photo to Rumali's Gallery
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
            />
          </label>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {memories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => handleOpenPhoto(mem)}
              className={`cursor-pointer group relative bg-white p-4 pb-6 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:z-30 hover:rotate-0 ${mem.rotation}`}
            >
              {/* Decorative Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 backdrop-blur-sm border-dashed border-t border-b border-amber-400/50 rotate-1 shadow-sm"></div>

              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-300" /> View Story
                  </span>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-4 text-center space-y-1">
                <h3 className="font-serif italic font-bold text-slate-900 text-base">
                  {mem.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-sans tracking-wide">
                  {mem.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="relative max-w-xl w-full p-6 rounded-3xl bg-[#0f1026] border border-gold-400/40 space-y-4 shadow-2xl">
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] overflow-hidden rounded-2xl">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  className="w-full h-full object-contain mx-auto rounded-2xl"
                />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-cinzel font-bold text-white">
                    {selectedMemory.title}
                  </h3>
                  <span className="text-xs text-gold-300 font-medium">
                    {selectedMemory.date}
                  </span>
                </div>
                <p className="text-slate-300 text-sm font-light">
                  {selectedMemory.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-rose-300">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-rose-400" /> Dedicated to Jannatul Firdaus Rumali
                </span>
                <span className="text-slate-400">18th September</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
