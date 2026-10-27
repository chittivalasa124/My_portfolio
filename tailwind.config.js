/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4f2ee',
        card: '#ffffff',
        ink: '#0d0d0d',
        'ink-2': '#3a3a3a',
        mute: '#77756f',
        faint: '#a9a6a0',
        line: 'rgba(13,13,13,0.1)',
        soft: '#e9e6e0'
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}

