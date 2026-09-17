import React from 'react';
import { BackgroundStars } from './components/BackgroundStars';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { BirthdayCake } from './components/BirthdayCake';
import { EnvelopesSection } from './components/EnvelopesSection';
import { TraitsSection } from './components/TraitsSection';
import { MemoryGallery } from './components/MemoryGallery';
import { WishBoard } from './components/WishBoard';
import { BirthdayKeepsake } from './components/BirthdayKeepsake';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-100 relative selection:bg-rose-500 selection:text-white">
      {/* Dynamic Stardust Background */}
      <BackgroundStars />

      {/* Floating Ambient Music & Sound Controller */}
      <MusicPlayer />

      {/* Main Experience Layout */}
      <main className="relative z-10">
        <HeroSection />
        <BirthdayCake />
        <EnvelopesSection />
        <TraitsSection />
        <MemoryGallery />
        <WishBoard />
        <BirthdayKeepsake />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
