/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#05060f',
          900: '#090a1a',
          800: '#11122e',
          700: '#1b1d44',
          600: '#26295c',
        },
        gold: {
          100: '#fff9db',
          200: '#fff3bf',
          300: '#ffec99',
          400: '#ffe066',
          500: '#ffd43b',
          600: '#fcc419',
          700: '#fab005',
          800: '#f59f00',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'flame': 'flame 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(245, 208, 97, 0.4), 0 0 30px rgba(255, 117, 140, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 208, 97, 0.8), 0 0 50px rgba(255, 117, 140, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'drop-shadow(0 0 8px #ff9800)' },
          '100%': { transform: 'scale(1.12) rotate(2deg)', filter: 'drop-shadow(0 0 16px #ff5722)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'gold-glow': '0 0 25px rgba(245, 208, 97, 0.45)',
        'rose-glow': '0 0 25px rgba(244, 63, 94, 0.45)',
      }
    },
  },
  plugins: [],
}
