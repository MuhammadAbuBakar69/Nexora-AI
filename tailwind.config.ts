import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111111",
        secondary: "#777783",
        violet: {
          primary: "#7557FF",
          soft: "#B4A3FF",
          light: "#F0EDFF",
          dark: "#5A3FE0",
        },
        blue: {
          soft: "#A5B4FC",
          light: "#EEF2FF",
        },
        surface: {
          DEFAULT: "#F7F7FA",
          subtle: "#FAFAFC",
          hover: "#F0F0F5",
          dark: "#100E20",
          cardDark: "#151329",
          borderDark: "#23203C",
        },
        border: {
          DEFAULT: "#ECECF1",
          subtle: "#E5E5EB",
          strong: "#D4D4DE",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heritage: ["TheHeritageLegacy", "var(--font-display)", "serif", "system-ui", "sans-serif"],
        display: ["TheHeritageLegacy", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 40px -15px rgba(117, 87, 255, 0.08)',
        'glow-violet': '0 0 50px -10px rgba(117, 87, 255, 0.3)',
        'glow-blue': '0 0 50px -10px rgba(165, 180, 252, 0.4)',
        'float': '0 20px 50px -10px rgba(16, 14, 32, 0.12), 0 10px 20px -5px rgba(16, 14, 32, 0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
