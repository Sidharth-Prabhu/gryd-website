/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#141212',
          secondary: '#191716',
          card: '#171615',
          elevated: '#1e1c1a',
        },
        text: {
          primary: '#F0E6E2',
          secondary: '#A9A19E',
          muted: '#77716E',
        },
        border: {
          subtle: '#302C2A',
          hover: '#423D3A',
        },
        accent: {
          DEFAULT: '#FF5A1F',
          hover: '#FF6B35',
          muted: 'rgba(255, 90, 31, 0.12)',
          border: 'rgba(255, 90, 31, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      spacing: {
        'grid': '24px',
      }
    },
  },
  plugins: [],
}
