/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500 (Brighter)
        secondary: '#d946ef', // Fuchsia-500 (Vibrant)
        accent: '#06b6d4', // Cyan-500 (Electric)
        dark: '#0f172a', // Slate-900
        darker: '#020617', // Slate-950
        card: '#ffffff', // White
        light: '#f8fafc', // Slate-50
        success: '#10b981', // Emerald-500
        warning: '#f59e0b', // Amber-500
        error: '#ef4444', // Red-500
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'], // More techy font if available, fallback to Inter
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }

    },
  },
  plugins: [],
}
