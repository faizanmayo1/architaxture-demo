/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────
        // "Midnight Atelier" — premium dark editorial
        // Deep ink base + warm brass accent + ivory text
        // ─────────────────────────────────────────────────────────
        paper: {
          DEFAULT: "#0B0B12",   // base background — deep ink with cool undertone
          deep: "#07070C",      // recessed surface
          card: "#14141C",      // raised card surface
          edge: "#1F1F28",      // hairline border / strong divider
        },
        ink: {
          DEFAULT: "#F5F0E2",   // warm ivory — primary text
          soft: "#C8C3B5",      // secondary text
          muted: "#857F70",     // muted text
          faint: "#5A5448",     // faint text
          line: "#2A2823",      // very faint divider
        },
        // Rich warm gold — brushed brass, not yellow
        // Dark theme: low scale values are saturated mid-tones so /20-/60 alpha
        // creates a visible warm wash over dark bg (vs invisible).
        ochre: {
          50: "#5A3F1C",        // warm mid-brown — at /30-/50 alpha = warm wash
          100: "#7A5526",
          200: "#9C7028",
          300: "#B58741",
          400: "#C49539",
          500: "#D4A453",       // primary accent — brushed brass gold
          600: "#E0B568",
          700: "#EBC681",       // for emphasis text on dark
          800: "#F4D89E",
        },
        emerald: {
          deep: "#6FB78C",      // emphasis / dot
          soft: "#2A5544",      // mid-green — at low alpha = visible green wash
        },
        crimson: {
          deep: "#E27575",
          soft: "#552A2D",
        },
        sky: {
          deep: "#8AB4D9",
          soft: "#264A5E",
        },
      },
      fontFamily: {
        display: ['"Roboto"', '-apple-system', 'sans-serif'],
        sans: ['"Roboto"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Roboto Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.06em' }],
      },
      boxShadow: {
        // Premium dark shadows — ambient + key light
        'paper': '0 1px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(255, 245, 220, 0.04), inset 0 1px 0 rgba(255, 245, 220, 0.02)',
        'paper-md': '0 1px 0 rgba(0,0,0,0.5), 0 8px 24px -4px rgba(0,0,0,0.6), 0 0 0 1px rgba(255, 245, 220, 0.06), inset 0 1px 0 rgba(255, 245, 220, 0.04)',
        'paper-lg': '0 24px 48px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(255, 245, 220, 0.08), inset 0 1px 0 rgba(255, 245, 220, 0.05)',
        'glow-ochre': '0 0 24px -2px rgba(212, 164, 83, 0.35), 0 0 0 1px rgba(212, 164, 83, 0.25)',
        'inset-edge': 'inset 0 -1px 0 rgba(255, 245, 220, 0.06)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.92 0 0 0 0 0.85 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'radial-glow': 'radial-gradient(ellipse at top right, rgba(212, 164, 83, 0.08) 0%, transparent 50%)',
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
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
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 164, 83, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 164, 83, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fade-in 400ms ease-out both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
