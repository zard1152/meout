/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      current: 'currentColor',
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      accent: {
        1: 'var(--color-accent-1)',
        2: 'var(--color-accent-2)',
        3: 'var(--color-accent-3)',
        4: 'var(--color-accent-4)',
        5: 'var(--color-accent-5)',
        6: 'var(--color-accent-6)',
        7: 'var(--color-accent-7)',
        8: 'var(--color-accent-8)',
      },
      red: {
        light: '#f33',
        DEFAULT: '#ff0000',
        dark: '#E60000',
      },
      blue: {
        light: '#3291FF',
        DEFAULT: '#0070f3',
        dark: '#0761d1',
      },
      green: {
        light: '#60cc70',
        DEFAULT: '#28cd41',
        dark: '#1c8a2c',
      },
      highlight: 'var(--color-highlight)',
    },
    extend: {
      fontFamily: {
        sans: [
          'SFRounded',
          'ui-rounded',
          "'SF Pro Rounded'",
          'system-ui',
          'san-serif',
        ],
      },
    },
  },

  plugins: [],
}
