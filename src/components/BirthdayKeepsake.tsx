import React, { useRef, useState } from 'react';
import { Award, Download, Crown, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { soundFx } from '../utils/audio';
import { triggerLuxuryConfetti } from '../utils/confetti';

export const BirthdayKeepsake: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      soundFx.playSparkle();

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#05060f',
        useCORS: true,
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Jannatul_Firdaus_Rumali_Birthday_Keepsake_18Sept.png`;
      link.href = dataUrl;
      link.click();

      triggerLuxuryConfetti();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("Error generating card image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="keepsake-card" className="relative py-24 px-4 scroll-mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>Digital Royal Token</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
            Honorary <span className="gold-gradient-text">Birthday Keepsake</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            A bespoke royal certificate crafted to honor Jannatul Firdaus Rumali on 18th September. Save or share this token!
          </p>
        </div>

        {/* The Printable Certificate Container */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-2xl p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c0d24] via-[#141238] to-[#0a0b1c] border-2 border-gold-400/70 shadow-[0_0_50px_rgba(245,208,97,0.25)] text-center space-y-6 overflow-hidden"
          >
            {/* Ornate corner borders */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-400"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-400"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-400"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-400"></div>

            {/* Top Emblem */}
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-gold-400 to-amber-500 flex items-center justify-center shadow-gold-glow">
              <Crown className="w-9 h-9 text-midnight-950 fill-midnight-950" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-300 font-semibold font-cinzel">
                CERTIFICATE OF ROYAL BRILLIANCE
              </span>
              <p className="text-xs text-rose-300 font-serif italic">
                This royal distinction is proudly bestowed upon
              </p>
              <h3 className="text-3xl sm:text-4xl font-black font-cinzel gold-gradient-text">
                Jannatul Firdaus Rumali
              </h3>
            </div>

            {/* Honorary Title Badge */}
            <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-gold-400/40 text-gold-200 font-cinzel text-sm sm:text-base font-bold shadow-sm">
              ✨ Queen of Starlight & Grace ✨
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              In celebration of your birthday on <strong>18th September</strong>. In recognition of your immense kindness, radiant smile, brilliant intellect, and the pure joy you bestow upon everyone blessed to know you.
            </p>

            {/* Signature & Date Ribbon */}
            <div className="pt-6 border-t border-gold-400/20 flex justify-between items-end px-4">
              <div className="text-left space-y-1">
                <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Date of Honor</span>
                <span className="font-cinzel text-sm font-bold text-gold-300">18th September</span>
              </div>

              <div className="text-right space-y-1">
                <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Royal Seal</span>
                <span className="font-script text-xl text-rose-300">Celebration Team ✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download & Customize Button Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-amber-400 to-rose-500 text-midnight-950 font-cinzel font-bold text-sm tracking-wider shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950 font-black" />
                <span>KEEPSAKE DOWNLOADED! ✨</span>
              </>
            ) : isDownloading ? (
              <span>GENERATING HIGH-RES CARD...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>SAVE & DOWNLOAD KEEPSAKE (HD)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
