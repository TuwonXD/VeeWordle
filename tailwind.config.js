/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DE4377',
          hover: '#C93667',
        },
        plum: {
          DEFAULT: '#3C2E35',
          dark: '#2D2228',
          muted: '#8D7B85',
          light: '#A69AA1',
        },
        softPink: {
          DEFAULT: '#FDECEF',
          border: '#F8D7DF',
        },
        wordle: {
          correct: '#EF88A6', // vibrant reference pink
          present: '#F9D97B', // soft warm yellow
          absent: '#D9D4DC',  // soft muted gray/lavender
          border: '#EEDFE4',
          activeBorder: '#EF88A6',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Plus Jakarta Sans', 'Quicksand', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        shake: 'shake 0.35s ease-in-out',
        pop: 'pop 0.12s ease-in-out',
      }
    },
  },
  plugins: [],
}
