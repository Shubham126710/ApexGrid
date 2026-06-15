/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        surfaceHighlight: '#1f1f1f',
        accent: '#e10600', // Formula 1 style red
        textPrimary: '#ffffff',
        textSecondary: '#a0a0a0',
        border: '#2a2a2a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        titillium: ['"Titillium Web"', 'sans-serif'],
      },
      backgroundImage: {
        'carbon-fiber': "repeating-linear-gradient(45deg, #1c1c1c, #1c1c1c 5px, #121212 5px, #121212 10px)"
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

