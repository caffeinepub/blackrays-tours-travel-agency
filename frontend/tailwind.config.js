/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Extended warm palette tokens
        warmGrey: '#9CA3AF',
        lightGrey: '#F3F4F6',
        charcoal: '#374151',
        warmSand: '#F5F0E8',
        lightBeige: '#FAF7F2',
        deepCharcoal: '#1F2937',
        goldAccent: '#B8975A',
        warmBrown: '#6B5744',
        cream: '#FEFCF8',
        stone: '#78716C',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'premium': '0 4px 24px -4px rgba(31, 41, 55, 0.12)',
        'premium-lg': '0 8px 40px -8px rgba(31, 41, 55, 0.16)',
        'warm': '0 4px 20px -4px rgba(107, 87, 68, 0.15)',
        'warm-lg': '0 8px 32px -8px rgba(107, 87, 68, 0.20)',
        'card': '0 2px 12px -2px rgba(31, 41, 55, 0.08)',
      },
      backgroundImage: {
        'hero-flight': "url('/assets/generated/hero-flight-premium.dim_1920x1080.png')",
        'hero-gradient': 'linear-gradient(135deg, rgba(31,41,55,0.65) 0%, rgba(55,65,81,0.45) 50%, rgba(31,41,55,0.30) 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
}
