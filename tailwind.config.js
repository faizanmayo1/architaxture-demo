/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────
        // Aragon brand palette — white surfaces, charcoal ink,
        // sky-blue accent (matches the Aragon Accounting logo).
        // ─────────────────────────────────────────────────────────
        paper: {
          DEFAULT: "#FFFFFF",   // pure white background
          deep: "#F5F6F8",      // recessed (very light gray)
          card: "#FFFFFF",      // raised cards — white with shadow
          edge: "#E8EAEE",      // hairline border
        },
        ink: {
          DEFAULT: "#2D2E33",   // Aragon wordmark charcoal
          soft: "#4A4C53",
          muted: "#7A7C82",
          faint: "#A8AAB0",
          line: "#E2E4E8",
        },
        // "ochre" name kept for compatibility but values are now Aragon sky blue
        ochre: {
          50: "#EFF8FD",
          100: "#DCEFF8",
          200: "#B8DEF1",
          300: "#92CAE5",
          400: "#6FB6D6",
          500: "#9DD6F2",       // Aragon primary brand sky blue
          600: "#5DA3C5",
          700: "#3F7FA0",
          800: "#2D5C77",
        },
        // Direct brand alias for clarity
        aragon: {
          50: "#EFF8FD",
          100: "#DCEFF8",
          blue: "#9DD6F2",      // logo accent
          ink: "#2D2E33",       // wordmark charcoal
          mid: "#888A91",       // monogram ring gray
          soft: "#7A7C82",      // subtitle gray
        },
        emerald: {
          deep: "#1F8055",
          soft: "#E2F2EC",
        },
        crimson: {
          deep: "#B43E3E",
          soft: "#FBE4E4",
        },
        sky: {
          deep: "#3F7FA0",
          soft: "#E8F4FB",
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
        // Large premium shadows for elevated cards on white bg
        'paper': '0 1px 2px rgba(45, 46, 51, 0.04), 0 4px 12px -2px rgba(45, 46, 51, 0.06), 0 0 0 1px rgba(45, 46, 51, 0.04)',
        'paper-md': '0 2px 4px rgba(45, 46, 51, 0.04), 0 12px 28px -4px rgba(45, 46, 51, 0.10), 0 0 0 1px rgba(45, 46, 51, 0.04)',
        'paper-lg': '0 4px 8px rgba(45, 46, 51, 0.04), 0 24px 48px -8px rgba(45, 46, 51, 0.14), 0 0 0 1px rgba(45, 46, 51, 0.05)',
        'card-rest': '0 1px 3px rgba(45, 46, 51, 0.05), 0 6px 16px -4px rgba(45, 46, 51, 0.08), 0 0 0 1px rgba(45, 46, 51, 0.04)',
        'card-hover': '0 2px 6px rgba(45, 46, 51, 0.06), 0 16px 32px -6px rgba(45, 46, 51, 0.14), 0 0 0 1px rgba(45, 46, 51, 0.06)',
        'glow-aragon': '0 0 0 1px rgba(157, 214, 242, 0.4), 0 8px 24px -4px rgba(157, 214, 242, 0.4)',
        'inset-edge': 'inset 0 -1px 0 rgba(45, 46, 51, 0.06)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
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
