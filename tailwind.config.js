/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#101010',
        accent: '#CCFF00'
      },
      fontFamily: {
        // Use system fallback fonts; Impact is not widely available but we can fallback
        impact: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};