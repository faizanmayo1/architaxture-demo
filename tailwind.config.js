/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────
        // Aragon — premium financial product palette
        // White canvas · charcoal ink · deep navy primary · sky accent
        // ─────────────────────────────────────────────────────────
        paper: {
          DEFAULT: "#FFFFFF",
          deep: "#F7F8FA",      // recessed sections (slight cool gray)
          card: "#FFFFFF",
          edge: "#E5E7EB",      // hairline border
        },
        ink: {
          DEFAULT: "#15171A",   // crisper than #2D2E33 for premium contrast
          soft: "#3D4047",
          muted: "#6E7280",
          faint: "#9CA0A8",
          line: "#E5E7EB",
        },
        // "ochre" stays as the alias used throughout the codebase.
        // 50–100: ambient sky-blue washes
        // 500: Aragon brand sky-blue (logo accent)
        // 600–800: deepening to navy primary (for buttons, emphasis)
        ochre: {
          50: "#F0F7FB",
          100: "#DBEBF5",
          200: "#B8DBED",
          300: "#8DC4E0",
          400: "#5DA3C5",
          500: "#9DD6F2",       // brand sky-blue (logo)
          600: "#3F7FA0",       // primary action navy
          700: "#2D5C77",       // hover/pressed primary
          800: "#1F4259",
        },
        aragon: {
          50: "#F0F7FB",
          100: "#DBEBF5",
          blue: "#9DD6F2",
          navy: "#2D5C77",      // deep brand navy for primary CTAs
          ink: "#15171A",
          mid: "#888A91",
          soft: "#6E7280",
        },
        emerald: {
          deep: "#057A55",
          soft: "#E2F4EC",
        },
        crimson: {
          deep: "#B43432",
          soft: "#FBE5E5",
        },
        sky: {
          deep: "#2D5C77",
          soft: "#E5F1F9",
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
      letterSpacing: {
        'crisp': '-0.022em',
      },
      boxShadow: {
        // Refined shadow scale — premium financial product
        'paper': '0 1px 2px rgba(21, 23, 26, 0.04), 0 4px 8px -2px rgba(21, 23, 26, 0.04), 0 0 0 1px rgba(21, 23, 26, 0.05)',
        'paper-md': '0 2px 4px rgba(21, 23, 26, 0.04), 0 12px 24px -4px rgba(21, 23, 26, 0.08), 0 0 0 1px rgba(21, 23, 26, 0.05)',
        'paper-lg': '0 4px 8px rgba(21, 23, 26, 0.04), 0 24px 40px -8px rgba(21, 23, 26, 0.12), 0 0 0 1px rgba(21, 23, 26, 0.05)',
        'paper-xl': '0 8px 16px rgba(21, 23, 26, 0.06), 0 32px 64px -12px rgba(21, 23, 26, 0.18), 0 0 0 1px rgba(21, 23, 26, 0.06)',
        'card-rest': '0 1px 2px rgba(21, 23, 26, 0.04), 0 6px 14px -4px rgba(21, 23, 26, 0.06), 0 0 0 1px rgba(21, 23, 26, 0.05)',
        'card-hover': '0 4px 8px rgba(21, 23, 26, 0.06), 0 16px 28px -6px rgba(21, 23, 26, 0.12), 0 0 0 1px rgba(21, 23, 26, 0.07)',
        'btn-primary': '0 1px 2px rgba(21, 23, 26, 0.12), 0 4px 8px -2px rgba(21, 23, 26, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'btn-primary-hover': '0 2px 4px rgba(21, 23, 26, 0.15), 0 8px 14px -2px rgba(21, 23, 26, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
        'glow-sky': '0 0 0 4px rgba(157, 214, 242, 0.25)',
        'glow-navy': '0 0 0 4px rgba(45, 92, 119, 0.18)',
        'inset-edge': 'inset 0 -1px 0 rgba(21, 23, 26, 0.06)',
      },
      backgroundImage: {
        'mesh-light': 'radial-gradient(at 100% 0%, rgba(157, 214, 242, 0.08) 0%, transparent 40%), radial-gradient(at 0% 100%, rgba(45, 92, 119, 0.04) 0%, transparent 40%)',
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
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'fade-in': 'fade-in 350ms ease-out both',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scale-in': 'scale-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};
