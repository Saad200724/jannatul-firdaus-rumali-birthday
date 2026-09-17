import confetti from 'canvas-confetti';

// Magical stardust & rose gold confetti bursts
export const triggerLuxuryConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ffd700', '#f5d061', '#ff758c', '#ffffff'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffd700', '#ff6b81', '#feca57', '#e056fd'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#f8a5c2', '#f7d794', '#63cdda', '#f3a683'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star'],
    colors: ['#ffd700', '#fff9db'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb'],
  });
};

// Fireworks display for candle blowing / major wish moment
export const triggerFireworks = () => {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: number = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left firework
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ffd700', '#ff758c', '#a855f7', '#38bdf8']
    });
    // Right firework
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#fbbf24', '#ec4899', '#8b5cf6', '#06b6d4']
    });
  }, 300);
};
