// Web Audio API Synthesizer for high-fidelity interactive soundscapes

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private timer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.bgGain && this.ctx) {
        this.bgGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      }
    } else {
      if (this.bgGain && this.ctx) {
        this.bgGain.gain.setTargetAtTime(0.08, this.ctx.currentTime, 0.05);
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  // Play magical sparkle / chime sound
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.001, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.45);
      });
    } catch {
      // Audio context error fallback
    }
  }

  // Play candle blowing / whoosh sound
  public playBlow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    } catch {
      // ignore
    }
  }

  // Play celebration fanfare when cake is blown or celebration popped
  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const melody = [
        { f: 392.00, d: 0.2, t: 0.0 },
        { f: 392.00, d: 0.2, t: 0.22 },
        { f: 440.00, d: 0.35, t: 0.45 },
        { f: 392.00, d: 0.35, t: 0.82 },
        { f: 523.25, d: 0.4, t: 1.2 },
        { f: 493.88, d: 0.6, t: 1.62 },
        { f: 587.33, d: 0.3, t: 2.3 },
        { f: 659.25, d: 0.8, t: 2.65 },
      ];

      melody.forEach(note => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0.001, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.12, now + note.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.t + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Play ambient lo-fi celebratory harmony loop
  public toggleAmbientMusic(): boolean {
    this.initCtx();
    if (this.isBgmPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  private startAmbientMusic() {
    if (!this.ctx) return;
    this.isBgmPlaying = true;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 440.00], // Fmaj7
      [196.00, 261.63, 392.00, 493.88], // Gsus4/G
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentNotes = chords[chordIdx % chords.length];
      chordIdx++;

      currentNotes.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f * 1.5, now + i * 0.15);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(this.isMuted ? 0 : 0.035, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.15);
        osc.stop(now + 4.0);
      });

      this.timer = window.setTimeout(playNextChord, 3800);
    };

    playNextChord();
  }

  public stopAmbientMusic() {
    this.isBgmPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const soundFx = new SoundController();
