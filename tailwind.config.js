/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial-financial palette — paper + ink + ochre
        paper: {
          DEFAULT: "#FAF7F0",   // warm cream background
          deep: "#F4EFE3",      // recessed
          card: "#FFFEFB",      // raised
          edge: "#EDE6D6",      // hairline
        },
        ink: {
          DEFAULT: "#0E0E12",   // near-black
          soft: "#2A2A33",
          muted: "#6B6B78",
          faint: "#9A9AA6",
          line: "#D9D6CC",
        },
        ochre: {
          50: "#FBF4E8",
          100: "#F4E2C2",
          200: "#E8C58A",
          300: "#D9A458",
          400: "#C8842F",
          500: "#B8651E",       // primary accent
          600: "#9A4F12",
          700: "#7A3D0E",
          800: "#5A2D0A",
        },
        emerald: {
          deep: "#1F5C3F",
          soft: "#D4E5DA",
        },
        crimson: {
          deep: "#8C2A2A",
          soft: "#F1D8D4",
        },
        sky: {
          deep: "#2C5878",
          soft: "#D5E1EC",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.06em' }],
      },
      fontVariationSettings: {
        'display-soft': '"opsz" 144, "SOFT" 50',
        'display-hard': '"opsz" 144, "SOFT" 0',
      },
      boxShadow: {
        'paper': '0 1px 0 rgba(14,14,18,0.04), 0 1px 2px rgba(14,14,18,0.04)',
        'paper-md': '0 1px 0 rgba(14,14,18,0.06), 0 4px 16px -2px rgba(14,14,18,0.06)',
        'inset-edge': 'inset 0 -1px 0 rgba(14,14,18,0.06)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fade-in 400ms ease-out both',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
