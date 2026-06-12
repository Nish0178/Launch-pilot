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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        slate: {
          50: '#FAF6F0',   // Lightest Beech Sand
          100: '#F5EBE0',  // Light Beech Wood
          200: '#E6CCB2',  // Beech Sand Tan
          300: '#DDB892',  // Beech Tan
          400: '#B08968',  // Beech Wood Light
          500: '#7F5539',  // Beech Wood Medium
          600: '#9C6644',  // Beech Wood Core
          700: '#7F5539',  // Beech Wood Dark
          800: '#5C3F2B',  // Deep Beech Wood
          900: '#2C1E14',  // Ebony Beech
          950: '#140D08',  // Darkest Beech Wood/Ebony
        },
        indigo: {
          50: '#FFFDF0',   // Champagne Gold
          100: '#FEF9C3',  // Pale Gold
          200: '#FDE047',  // Gold Accent
          300: '#FACC15',  // Bright Gold
          400: '#EAB308',  // Warm Amber Gold
          500: '#D4AF37',  // Metallic Gold
          600: '#C5A028',  // Core Gold
          700: '#A17D18',  // Deep Gold
          800: '#85640F',  // Golden Bronze
          900: '#71510B',  // Dark Bronze Gold
          950: '#422C03',  // Deep Gold-Brown Accent
        },
        purple: {
          50: '#FFFDF5',
          100: '#FEF7E0',
          200: '#FDEBB3',
          300: '#FCD87D',
          400: '#FBC047',
          500: '#EAB308', // Amber Gold
          600: '#D97706', // Dark Amber Gold
          700: '#B45309', // Deep Amber
          800: '#92400E', // Bronze Amber
          900: '#78350F', // Dark Bronze Amber
          950: '#451A03',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

